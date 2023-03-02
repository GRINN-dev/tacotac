/*
  TABLE: publ.registrations
  DESCRIPTION: la table registration contient les inscriptions d''un evenement
*/
drop table if exists publ.registrations cascade;
create table publ.registrations (
    id uuid not null default uuid_generate_v4() primary key unique, 
    event_id uuid  references publ.events(id),
    ticket_number text,
    is_email_sent boolean default false,
    qr_code_url text,
    pdf_link text,
    sign_code text,
    hear_about_list text[] default '{"par un mécène", "par une association lauréate", "par le bouche à oreille", "autre", "par Obole, co-organisateur de l''événement", "par la Fondation de France, co-organisateur de l''événement"}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
--test
-- indexes
  create index on publ.registrations(created_at);
  create index on publ.registrations(updated_at);
  create index on publ.registrations(event_id);

-- RBAC
    grant select on publ.registrations to :DATABASE_VISITOR;
    grant insert(event_id, ticket_number, is_email_sent, qr_code_url, pdf_link, sign_code) on publ.registrations to :DATABASE_VISITOR;
    grant update(event_id, ticket_number, is_email_sent, qr_code_url, pdf_link, sign_code) on publ.registrations to :DATABASE_VISITOR;
    grant delete on publ.registrations to :DATABASE_VISITOR;
-- triggers
  create trigger _100_timestamps
  before insert or update on publ.registrations
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.registrations enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.registrations
   for all
   using (true)
   with check(true);

  /*
  END TABLE: publ.registrations
*/ 
-- fixtures
  -- fixtures go here


   
