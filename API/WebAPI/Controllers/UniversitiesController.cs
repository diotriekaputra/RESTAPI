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
    public class UniversitiesController : BaseController<University, UniversityRepository, string>
    {
        public UniversitiesController(UniversityRepository repository) : base(repository)
        {

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
