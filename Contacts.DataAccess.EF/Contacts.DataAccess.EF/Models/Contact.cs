using System;
using System.Collections.Generic;

namespace Contacts.DataAccess.EF.Models;

public partial class Contact
{
    public int ContactId { get; set; }

    public string? FullName { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public bool? IsFavorite { get; set; }
}
