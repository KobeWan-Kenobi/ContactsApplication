using Contacts.DataAccess.EF.Repositories;
using Contacts.DataAccess.EF.Models;
using Contacts.DataAccess.EF.Context;
namespace ContactsApp.Models
{
    public class ContactsViewModel
    {
        private ContactRepository _repo;
        public List<Contact>? ContactList { get; set; }
        public Contact? CurrentContact {  get; set; }
        public bool IsActionSuccess {  get; set; }
        public string ActionMessage {  get; set; }
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
            if(contactID > 0)
            {
                CurrentContact = GetContact(contactID);

            }
        }
    }
}
