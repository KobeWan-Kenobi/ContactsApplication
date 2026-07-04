using Contacts.DataAccess.EF.Context;
using ContactsApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactsApp.Controllers
{
    public class ContactsController : Controller
    {
        private readonly ContactsContext _context;
        public IActionResult Index()
        {
            ContactsViewModel model = new ContactsViewModel(_context);
            return View(model);
        }
    }
}
