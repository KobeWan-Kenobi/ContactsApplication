using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models.DTOs
{
    public class ContactUpdateDTO
    {
        [Key]
        public int ContactId { get; set; }
        [Required]
        public string FullName { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool IsFavorite { get; set; } = false;
    }
}
