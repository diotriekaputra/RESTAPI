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
    public class ProfilingsController : BaseController<Profiling, ProfilingRepository, string>
    {
        public ProfilingsController(ProfilingRepository repository) : base(repository)
        {

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
