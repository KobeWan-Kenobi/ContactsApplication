using Contacts.DataAccess.EF.Context;
using ContactsApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Contacts.DataAccess.EF.Models;
using System.Net;
using ContactsApi.Models.DTOs;

namespace ContactsApp.Controllers
{
    [Route("api/Contacts")]
    [ApiController]
    public class ContactController : Controller
    {
        private readonly ContactsDbContext _context;
        private readonly ApiResponse _response;
        public ContactController(ContactsDbContext context)
        {
            _context = context;
            _response = new ApiResponse();
        }
        [HttpGet]
        public IActionResult GetContactList()
        {
            ContactViewModel viewModel = new ContactViewModel(_context);
            _response.Result = viewModel.GetAllContacts();
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpGet("{contactId:int}", Name = "GetContact")]
        public IActionResult GetContact(int contactId)
        {
            ContactViewModel viewModel = new ContactViewModel(_context);
            if (contactId == 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }
            _response.Result = viewModel.GetContact(contactId);
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateContact([FromBody] ContactCreateDTO contactCreateDTO)
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
                else if(contactCreateDTO == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ["Error: contactCreateDTO is null"];
                    return BadRequest(_response);
                }
                else
                {
                    ContactViewModel viewModel = new ContactViewModel(_context);
                    Contact newContact = new()
                    {
                        FullName = contactCreateDTO.FullName,
                        Phone = contactCreateDTO.Phone,
                        Email = contactCreateDTO.Email,
                        IsFavorite = contactCreateDTO.IsFavorite,
                    };
                    viewModel.SaveContact(newContact);
                    _response.IsSuccess = true;
                    _response.Result = contactCreateDTO;
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


        public IActionResult Update(int contactId)
        {
            ContactViewModel viewModel = new ContactViewModel(_context, contactId);
            return View(viewModel);
        }
        public IActionResult Delete(int contactId)
        {
            ContactViewModel viewModel = new ContactViewModel(_context);
            if (contactId > 0)
            {
                viewModel.RemoveContact(contactId);
            }
            viewModel.IsActionSuccess = true;
            viewModel.ActionMessage = "Contact has been deleted successfully";
            return View("Index", viewModel);
        }
    }
}
