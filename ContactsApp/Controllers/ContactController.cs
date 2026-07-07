using Contacts.DataAccess.EF.Context;
using ContactsApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Contacts.DataAccess.EF.Models;

namespace ContactsApp.Controllers
{
    public class ContactController : Controller
    {
        private readonly ContactsContext _context;
        public IActionResult Index()
        {
            ContactViewModel viewModel = new ContactViewModel(_context);
            return View(viewModel);
        }

        [HttpPost]
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
