using System;
using System.Collections.Generic;

namespace Contacts.DataAccess.EF.Models
{

    public partial class Contact
    {
        public int ContactId { get; set; }

        public string? FullName { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public bool? IsFavorite { get; set; }

        public Contact(int contactId, string fullName, string phone, string email, bool isFavorite)
        {
            ContactId = contactId;
            FullName = fullName;
            Phone = phone;
            Email = email;
            IsFavorite = isFavorite;
        }
        public Contact()
        {

        }
    }
}