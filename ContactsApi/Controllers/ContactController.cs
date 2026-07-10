using Contacts.DataAccess.EF.Context;
using ContactsApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Contacts.DataAccess.EF.Models;
using System.Net;

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

        [HttpGet("{contactId:int}", Name="GetContact")]
        public IActionResult GetContact(int contactId)
        {
            ContactViewModel viewModel = new ContactViewModel(_context);
            if(contactId == 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }
            _response.Result = viewModel.GetContact(contactId);
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
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
