using Contacts.DataAccess.EF.Context;
using Contacts.DataAccess.EF.Models;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;


namespace Contacts.DataAccess.EF.Repositories
{

    public class ContactRepository : IContactRepository
    {
        private ContactsDbContext _contactsDbContext;
        public ContactRepository(ContactsDbContext contactsContext)
        {
            _contactsDbContext = contactsContext;
        }
        public int Create(Contact contact)
        {
            _contactsDbContext.Add(contact);
            _contactsDbContext.SaveChanges();
            return contact.ContactId;
        }
        public int Update(Contact contact)
        {
            Contact? existingContact = _contactsDbContext.Contacts.Find(contact.ContactId);
            if (existingContact != null)
            {
                existingContact.FullName = contact.FullName;
                existingContact.Phone = contact.Phone;
                existingContact.Email = contact.Email;
                existingContact.IsFavorite = contact.IsFavorite;
                _contactsDbContext.SaveChanges();
            }
            return contact.ContactId;
        }
        public bool Delete(int contactID)
        {
            Contact? oldContact = _contactsDbContext.Contacts.Find(contactID);
            if (oldContact != null)
            {
                _contactsDbContext.Contacts.Remove(oldContact);
                _contactsDbContext.SaveChanges();
                return true;
            }
            return false;
        }
        public List<Contact> GetAllContacts()
        {
            return _contactsDbContext.Contacts.ToList();
        }

        public Contact GetContactById(int contactID)
        {
            Contact? contact = _contactsDbContext.Contacts.Find(contactID);
            return contact;
        }
    }
}
