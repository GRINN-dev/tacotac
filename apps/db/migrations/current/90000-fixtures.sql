  insert into publ.organizations (id, name, description, logo_url) values ('3fdd6e49-8a4b-41c8-8df0-17fe8be4efb8', 'The Organisation', 'The Organisation is a group of people who work together on projects.', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('3d670ad3-29c6-4a8d-a761-f8494859c67f', 'La Nuit Du Bien Commun', 'La nuit du bien commun', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('80bdb4c2-6fee-488c-b0c2-d9e34317c1d2', 'Obole', 'Obole startup', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');
  insert into publ.organizations (id, name, description, logo_url) values ('881a4dc1-b74f-4e21-9d37-87b83970642f', 'Grinn', 'Grinn agency web', 'https://project-management.com/wp-content/uploads/2022/11/PMcom_logo_MobileLogo.png');

insert into publ.organizations (name, slug, description, logo_url) values ('Michou', 'michou', 'Michou est une organisation', 'https://randomuser.me/api/portraits/men/3.jpg');
insert into publ.organization_memberships (organization_id, user_id, role) values ((select id from publ.organizations where slug='michou'), (select id from publ.users where username='Michou'), 'OWNER');





    insert into publ.events (id, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('b9b4b51f-e5e1-4068-a593-4c7212da4e2d','Nantes', 'Apéro Chez Daddy', 'Des cafés conviviaux et intergénrationnels pour recréer du lien dans les quartiers', (select id from publ.organizations where name = 'The Organisation'),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')));
    insert into publ.events (id, is_draft, city, name, description, organization_id, starts_at,ends_at, booking_starts_at ,booking_ends_at) values ('347687ee-e455-4041-a3e0-ccf484149785', false, 'Paris','La nuit des devs', 'second test', (select id from publ.organizations where name = 'Grinn'),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),(select timestamp '2023-05-10 20:00:00' + random() * (timestamp '2023-05-20 20:00:00' - timestamp '2023-05-10 10:00:00')),'2023-02-20 20:00:00','2023-12-20 20:00:00');







 insert into publ.attendees ( civility, firstname,lastname, email, is_inscriptor ,status) values ('MR','1', 'blip','1@blip.com',true,'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MME','2', 'blip','2@blip.com', 'IDLE');

    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '11', 'blip','11@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '111', 'blip','111@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '12', 'blip','12@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '13', 'blip','13@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '14', 'blip','14@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', '15', 'blip','15@blip.com', 'IDLE');
    insert into publ.attendees ( civility, firstname,lastname, email, status) values ('MR', 'tst', 'testeuh','tst@testeuh.com','IDLE');

