using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Contacts.DataAccess.EF.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; } = string.Empty;
    }
}
