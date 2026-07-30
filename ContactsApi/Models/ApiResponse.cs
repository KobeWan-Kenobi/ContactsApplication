using ContactsApi.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Contacts.DataAccess.EF.Models
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; } = true;
        public List<string> ErrorMessages { get; set; } = [];
        public List<ContactDTO>? ContactDtoList { get; set; } = [];
        public ContactDTO? ContactDto { get; set; } = null;

        public ApiResponse()
        {
            StatusCode = HttpStatusCode.OK;
            IsSuccess = true;
            ContactDto = new ContactDTO();
            ContactDto.ContactId = -1;
            ContactDto.FullName = string.Empty;
            ContactDto.Phone = string.Empty;
            ContactDto.IsFavorite = false;
            ContactDto.Email = string.Empty;
        }
    }


}
