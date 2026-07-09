using System;
using System.Collections.Generic;
using System.Text;
using Contacts.DataAccess.EF.Models;

namespace Contacts.DataAccess.EF.Repositories
{
    public interface IContactRepository
    {
        int Create(Contact contact);
        int Update(Contact contact);
        bool Delete(int contactId);
        List<Contact> GetAllContacts();
        Contact? GetContactById(int contactId);
    }
}
