using Contacts.DataAccess.EF.Context;
using Microsoft.AspNetCore.Mvc;
using Contacts.DataAccess.EF.Models;
using System.Net;
using ContactsApi.Models.DTOs;
using Contacts.DataAccess.EF.Repositories;

namespace ContactsApp.Controllers
{
    [Route("api/Contacts")]
    [ApiController]
    public class ContactController : Controller
    {
        private readonly IContactRepository _contactRepository;
        private ApiResponse _response;
        public ContactController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
            _response = new ApiResponse();
        }
        [HttpGet]
        public IActionResult GetContactList()
        {

            List<Contact>? contactModelList = _contactRepository.GetAllContacts() ?? [];
            List<ContactDTO>? contactDTOList = ContactDTO.ToDtoList(contactModelList);
            _response.ContactDtoList = contactDTOList;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpGet("{contactId:int}", Name = "GetContact")]
        public IActionResult GetContact(int contactId)
        {
            if (contactId < 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }
            _response.ContactDtoList = null;
            _response.ContactDto = ContactDTO.ToDto(_contactRepository.GetContactById(contactId));
            if(_response.ContactDto != null)
            {
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            else
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                return NotFound(_response);
            }
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateContact([FromBody] ContactCreateDTO incomingContactCreateDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ["Error: ModelState is invalid"];
                    return BadRequest(_response);
                }
                else if (incomingContactCreateDTO == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ["Error: contactCreateDTO is null"];
                    return BadRequest(_response);
                }
                else
                {
                    Contact newContact = new()
                    {
                        FullName = incomingContactCreateDTO.FullName,
                        Phone = incomingContactCreateDTO.Phone,
                        Email = incomingContactCreateDTO.Email,
                        IsFavorite = incomingContactCreateDTO.IsFavorite,
                    };
                    _response.IsSuccess = true;
                    int newContactId = _contactRepository.Create(newContact);
                    _response.ContactDto = new ContactDTO
                    {
                        ContactId = newContactId,
                        FullName = incomingContactCreateDTO.FullName,
                        Phone = incomingContactCreateDTO.Phone,
                        Email = incomingContactCreateDTO.Email,
                        IsFavorite = incomingContactCreateDTO.IsFavorite
                    };
                    _response.ContactDtoList = null;
                    _response.StatusCode = HttpStatusCode.Created;
                    return CreatedAtRoute("GetContact", new { contactId = newContact.ContactId }, _response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = [ex.ToString()];
            }
            return BadRequest(_response);
        }

        [HttpDelete("{contactId:int}", Name = "DeleteContact")]
        public async Task<ActionResult<ApiResponse>> DeleteContact(int contactId)
        {
            try
            {
                _response.ContactDto = null;
                _response.ContactDtoList = null;
                if (!ModelState.IsValid)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ["Error: ModelState is invalid"];
                    return BadRequest(_response);
                }
                else
                {
                    _response.IsSuccess = _contactRepository.Delete(contactId);
                    _response.StatusCode = HttpStatusCode.OK;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = [ex.ToString()];
            }
            return BadRequest(_response);
        }
        [HttpPut(Name = "UpdateContact")]
        public async Task<ActionResult<ApiResponse>> UpdateContact([FromBody] ContactDTO incomingContactDTO)
        {
            try
            {
                _response.ContactDto = null;
                _response.ContactDtoList = null;
                if (!ModelState.IsValid)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ["Error: ModelState is invalid"];
                    return BadRequest(_response);
                }
                else if (incomingContactDTO == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ["Error: contactCreateDTO is null"];
                    return BadRequest(_response);
                }
                else
                {
                    Contact updatedContact = new()
                    {
                        ContactId = incomingContactDTO.ContactId,
                        FullName = incomingContactDTO.FullName,
                        Phone = incomingContactDTO.Phone,
                        Email = incomingContactDTO.Email,
                        IsFavorite = incomingContactDTO.IsFavorite,
                    };
                    _response.IsSuccess = _contactRepository.Update(updatedContact);
                    _response.StatusCode = _response.IsSuccess ? HttpStatusCode.NotFound : HttpStatusCode.OK;
                    return CreatedAtRoute("UpdateContact", _response);
                }

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = [ex.ToString()];
            }
            return BadRequest(_response);
        }
    }
}
