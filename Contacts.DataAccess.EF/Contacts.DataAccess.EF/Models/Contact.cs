using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;

namespace Contacts.DataAccess.EF.Models
{

    public partial class Contact 
    {
        public int ContactId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool IsFavorite { get; set; } = false;

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