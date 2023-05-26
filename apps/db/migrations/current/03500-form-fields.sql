drop table if exists publ.field_types cascade;
create table publ.field_types (
    type text primary key,
    description text
);
comment on table publ.field_types is E'@enum';

insert into publ.field_types values
    ('text', 'Un input de type `text`'),
    ('textarea', 'Un input de type `textarea`'),
    ('select', 'Un input de type `select`'),
    ('radio', 'Un input de type `radio`'),
    ('checkbox', 'Un input de type `checkbox`'),
    ('date', 'Un input de type `date`'),
    ('email', 'Un input de type `email`'),
    ('tel', 'Un input de type `tel`'),
    ('number', 'Un input de type `number`');


/*
  TABLE: publ.form_fields
  DESCRIPTION: Fields for the form
*/
drop table if exists publ.form_fields cascade;
create table publ.form_fields (
    id uuid not null default uuid_generate_v4() primary key unique, 
    event_id uuid not null references publ.events(id) on delete cascade,
    name text,
    label text not null,
    type text not null references publ.field_types on delete cascade,
    is_required_for_inscriptor boolean not null default false,
    is_required_for_attendee boolean not null default false,
    is_deletable boolean not null default true,
    applies_to_all_attendees boolean not null default true,
    options text[],
    placeholder text,
    position integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.form_fields(created_at);
  create index on publ.form_fields(updated_at);
  create index on publ.form_fields(event_id);
  create index on publ.form_fields(type);
  create index on publ.form_fields(position);

-- RBAC
  grant select on publ.form_fields to :DATABASE_VISITOR;
  grant insert (event_id, name, label, type, is_required_for_inscriptor, is_required_for_attendee, is_deletable, applies_to_all_attendees, options, placeholder, position) on publ.form_fields to :DATABASE_VISITOR;
  grant update (name, label, type, is_required_for_inscriptor, is_required_for_attendee, is_deletable, applies_to_all_attendees, options, placeholder, position) on publ.form_fields to :DATABASE_VISITOR;
  grant delete on publ.form_fields to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.form_fields
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.form_fields enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.form_fields
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.form_fields
*/


drop function if exists priv.tg_form_fields__insert_with_events cascade;
create function priv.tg_form_fields__insert_with_events() returns trigger as $$
begin
    -- insert all the mendatory fields when an event is created: for everyone: email (only mendatory for inscriptor), firstname, lastname, civility
    if (TG_OP = 'INSERT') then
        insert into publ.form_fields (event_id, name, label, type, is_required_for_inscriptor, is_required_for_attendee, is_deletable, applies_to_all_attendees, options, placeholder, position)
        values (new.id, 'email', 'Email', 'email', true, false, false, true, null, null, 0),
               (new.id, 'firstname', 'Prénom', 'text', true, true, false, true, null, null, 1),
               (new.id, 'lastname', 'Nom', 'text', true, true, false, true, null, null, 2),
               (new.id, 'civility', 'Civilité', 'select', true, true, False, true, '{"Monsieur","Madame"}', null, 5);
    end if;
    return new;
end;
$$ language plpgsql volatile security definer;
grant execute on function priv.tg_form_fields__insert_with_events to :DATABASE_VISITOR;


create trigger _700_form_fields__insert_with_events
after insert on publ.events
for each row
execute procedure priv.tg_form_fields__insert_with_events();

-- create a trigger that orders automatically the fields when on field is modified (position) in an event. All fields in an event have a different position and when one is modified, all subsequent fields are shifted. the max position is the number of fields in the event.


drop table if exists priv.update_form_field_order cascade;
create table priv.update_form_field_order (
  id uuid not null default uuid_generate_v4() primary key unique,
  event_id uuid not null references publ.events(id) on delete cascade
);

drop function if exists priv.tg_form_fields__order cascade;
create function priv.tg_form_fields__order() returns trigger as $$
declare
  max_order int;
begin

  if 
    exists (SELECT 1 FROM priv.update_form_field_order WHERE event_id = NEW.event_id)
  then
      return NEW;
  end if;

  insert into priv.update_form_field_order (event_id) values (NEW.event_id);

    if (TG_OP = 'INSERT') then
      max_order := (select (count(*) )
        from publ.form_fields
        where event_id = NEW.event_id);

        if (NEW.position is null) then
            -- Get the max "order" value for the organization
            
            if (max_order IS NOT NULL) then
                NEW.position = max_order + 1;
            ELSE
                NEW.position = 0;
            END if;
        ELSE
            NEW.position =( select least(NEW.position, max_order));
            -- Shift existing projects with higher "order" value
            update publ.form_fields
            set position = position + 1
            where event_id = NEW.event_id
            and position >= NEW.position;
        END if;
    elsif (TG_OP = 'UPDATE') then
        if (OLD.position <> NEW.position) then
            -- Shift existing projects with higher "order" value
            if (OLD.position < NEW.position) then
                update publ.form_fields
                set position = position - 1
                where event_id = NEW.event_id
                and position > OLD.position
                and position <= NEW.position;
            else
                update publ.form_fields
                set position = position + 1
                where event_id = NEW.event_id
                and position >= NEW.position
                and position < OLD.position;
            end if;
        end if;
    end if;
    delete from priv.update_form_field_order where event_id = NEW.event_id;
    return NEW;
end;
$$ language plpgsql volatile security definer;
grant execute on function priv.tg_form_fields__order to :DATABASE_VISITOR;

drop trigger if exists _100_form_fields__order on publ.form_fields cascade;
create trigger _100_form_fields__order
before insert or update on publ.form_fields
for each row
execute procedure priv.tg_form_fields__order();

