using Contacts.DataAccess.EF.Repositories;
using Contacts.DataAccess.EF.Models;
using Contacts.DataAccess.EF.Context;
using System.ComponentModel;
namespace ContactsApp.Models
{
    public class ContactsViewModel
    {
        private ContactRepository _repo;
        public List<Contact>? ContactList { get; set; }
        public Contact? CurrentContact { get; set; }
        public bool? IsActionSuccess { get; set; }
        public string? ActionMessage { get; set; }
        public ContactsViewModel(ContactsContext context)
        {
            _repo = new ContactRepository(context);
            ContactList = GetAllContacts();
            CurrentContact = ContactList.FirstOrDefault();
        }
        public ContactsViewModel(ContactsContext context, int contactID)
        {
            _repo = new ContactRepository(context);
            ContactList = GetAllContacts();
            if (contactID > 0)
            {
                CurrentContact = GetContact(contactID);

            }
        }
        public void SaveContact(Contact contact)
        {
            if (contact.ContactId > 0)
            {
                _repo.Update(contact);
            }
            else
            {
                contact.ContactId = _repo.Create(contact);
            }
            ContactList = GetAllContacts();
            CurrentContact = GetContact(contact.ContactId);
        }
        public List<Contact> GetAllContacts()
        {
            return _repo.GetAllContacts();
        }
        public Contact GetContact(int contactID)
        {
            return _repo.GetContactById(contactID);
        }
    }
}
