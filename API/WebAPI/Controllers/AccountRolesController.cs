using API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Base.Controllers;
using WebAPI.Repositories.Data;

namespace WebAPI.Controllers
{
    public class AccountRolesController : BaseController<AccountRole, AccountRoleRepository, string>
    {
        public AccountRolesController(AccountRoleRepository repository) : base(repository)
        {

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
