/*
  TABLE: publ.attendee_form_fields
  DESCRIPTION: that the attendee filled in the form
*/
drop table if exists publ.attendee_form_fields cascade;
create table publ.attendee_form_fields (
    id uuid not null default uuid_generate_v4() primary key unique, 
    attendee_id uuid not null references publ.attendees(id) on delete cascade,
    field_id uuid not null references publ.form_fields(id) on delete cascade,
    value text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.attendee_form_fields(created_at);
  create index on publ.attendee_form_fields(updated_at);
CREATE INDEX ON "publ"."attendee_form_fields"("field_id");
 CREATE INDEX ON "publ"."attendee_form_fields"("attendee_id");
-- RBAC
  grant select on publ.attendee_form_fields to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.attendee_form_fields
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.attendee_form_fields enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.attendee_form_fields
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.attendee_form_fields
*/