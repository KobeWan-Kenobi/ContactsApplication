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
            _response.Result = viewModel.ContactList;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpPost]
        public IActionResult Index()
        {
            ContactViewModel viewModel = new ContactViewModel(_context);
            return View(viewModel);
        }

        
        public IActionResult Index(int contactId, string fullName, string phone, string email, bool isFavorite)
        {
            ContactViewModel viewModel = new ContactViewModel(_context);

            Contact contact = new Contact(contactId, fullName, phone, email, isFavorite);

            viewModel.SaveContact(contact);
            viewModel.IsActionSuccess = true;
            viewModel.ActionMessage = "Contact has been saved successfully";

            return View(viewModel);
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
