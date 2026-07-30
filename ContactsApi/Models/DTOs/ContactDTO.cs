using Contacts.DataAccess.EF.Models;
using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models.DTOs
{
    public class ContactDTO
    {
        [Key]
        public int ContactId { get; set; } 
        [Required]
        public string FullName { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool IsFavorite { get; set; } = false;

        public static ContactDTO ToDto(Contact contact)
        {
            return new ContactDTO
            {
                ContactId = contact.ContactId,
                Email = contact.Email,
                Phone = contact.Phone,
                FullName = contact.FullName,
                IsFavorite = contact.IsFavorite,
            };
        }

        public static List<ContactDTO> ToDtoList(List<Contact> contactList)
        {
            List<ContactDTO> contactDtoList = new List<ContactDTO>();
            for (int i = 0; i < contactList.Count; i++)
            {
                ContactDTO contactDto = new ContactDTO
                {
                    ContactId = contactList[i].ContactId,
                    Email = contactList[i].Email,
                    Phone = contactList[i].Phone,
                    FullName = contactList[i].FullName,
                    IsFavorite = contactList[i].IsFavorite,
                };
                contactDtoList.Add(contactDto);
            }
            return contactDtoList;
        }
    }
}
