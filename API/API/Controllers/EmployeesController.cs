using API.Base;
using API.Context;
using API.Models;
using API.Repository;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;
        public IConfiguration _configuration;

        private readonly MyContext myContext;
        public EmployeesController(EmployeeRepository employeeRepository, IConfiguration configuration, MyContext myContext) : base(employeeRepository) 
        {
            this.employeeRepository = employeeRepository;
            this._configuration = configuration;
            this.myContext = myContext;
        }

        [Route("Register")]
        [HttpPost]
        public ActionResult Register(RegisterVM registerVM)
            {
                var result = employeeRepository.Register(registerVM);
            if (result == 2)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data Gagal Dimasukkan, ID yang Anda Masukkan Sudah Terdaftar!" });
            }
            else if (result == 3)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data Gagal Dimasukkan, Nomor HP yang Anda Masukkan Sudah Terdaftar!" });
            }
            else if (result == 4)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data Gagal Dimasukkan, Email yang Anda Masukkan Sudah Terdaftar!" });
            }
            else if (result == 5)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal dimasukkan, Universiy ID yang Anda Masukkan Belum Terdaftar!" });
            }
            /*return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Berhasil Ditambahkan" });*/
            return Ok(result);
        }

        /*[Route("Register")]
        [HttpGet]
        public ActionResult<RegisterVM> GetProfile()
        {
            var getProfile = employeeRepository.GetProfile();
            if (getProfile.ToList().Count > 0)
            {
                return Ok(new { status = HttpStatusCode.OK, result = getProfile, message = "Data berhasil Ditambahkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getProfile, message = $"Data Tidak Ada" });
            }
        }*/

        [Route("Register/{NIK}")]
        public ActionResult<RegisterVM> GetProfileNik(string NIK)
        {
            var ada = employeeRepository.Get(NIK);
            if (ada != null)
            {
                /*return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil Ditambahkan dengan NIK : {NIK}" });*/
                return Ok(ada);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = ada, message = $"Data Tidak Ada" });
        }

        /*[Authorize(Roles = "Director,Manager")]*/
        [Route("Profile")]
        [HttpGet]
        public ActionResult<RegisterVM> GetProfile()
        {
            var getProfile = employeeRepository.GetProfile();
            if (getProfile.ToList().Count > 0)
            {
                return Ok(getProfile);
                /*return Ok(new { status = HttpStatusCode.OK, result = getProfile, message = "Data Berhasil Ditampilkan" });*/
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getProfile, message = "Data Gagal Ditampilkan" });
            }
        }

        [Authorize(Roles = "Director")]
        [Route("SignManager")]
        [HttpPost]
        public ActionResult SignManager(AccountRole accountRole)
        {
            var result = employeeRepository.SignManager(accountRole);
            if (result == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil Di UPDATE!!!" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = result, message = "Data tidak berhasil Di UPDATE!!!" });
            }
        }

        [Route("Login")]
        [HttpPost]
        public ActionResult Login(LoginVM loginVM)
        {
            var result = employeeRepository.Login(loginVM);
            if (result == 2)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal dimasukkan : EMAIL yang Anda masukkan TIDAK TERDAFTAR!!!" });
            }
            else if (result == 3)
            {
                var getRoles = employeeRepository.GetRole(loginVM.Email);

                var data = new LoginVM()
                {
                    Email = loginVM.Email,
                };

                var claims = new List<Claim>
                {
                    new Claim("Email", data.Email),
                };

                foreach (var item in getRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, item.ToString()));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var sigIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken
                    (
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: sigIn
                    );

                var idtoken = new JwtSecurityTokenHandler().WriteToken(token);
                claims.Add(new Claim("TokenSecurity", idtoken.ToString()));
                /*return Ok(new { status = HttpStatusCode.OK, idtoken, message = "Login Berhasil" });*/
                return Ok(new JWTokenVM
                {
                    /* status = HttpStatusCode.OK, */
                    Token = idtoken,
                    Messages = "Login Berhasil!!"
                });
            }
            else
            {
                return Ok(new { status = HttpStatusCode.BadRequest, message = "Login Gagal" });
            }
        }


        [Route("Gender")]
        [HttpGet]
        public ActionResult<RegisterVM> GetGender()
        {
            var getGender = employeeRepository.GetGender();
            if (getGender != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = getGender, message = "Data Berhasil Ditampilkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getGender, message = "Data Gagal Ditampilkan" });
            }
        }

        [Route("Role")]
        [HttpGet]
        public ActionResult<RegisterVM> GetRole()
        {
            var getRole = employeeRepository.GetRole();
            if (getRole != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = getRole, message = "Data Berhasil Ditampilkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getRole, message = "Data Gagal Ditampilkan" });
            }
        }

        [Route("Salary")]
        [HttpGet]
        public ActionResult<RegisterVM> GetSalary()
        {
            var getSalary = employeeRepository.GetSalary();
            if (getSalary != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = getSalary, message = "Data Berhasil Ditampilkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getSalary, message = "Data Gagal Ditampilkan" });
            }
        }

        [Route("Degree")]
        [HttpGet]
        public ActionResult<RegisterVM> GetDegree()
        {
            var getDegree = employeeRepository.GetDegree();
            if (getDegree != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = getDegree, message = "Data Berhasil Ditampilkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getDegree, message = "Data Gagal Ditampilkan" });
            }
        }

        /*[Route("Login")]
        [HttpPost]
        public ActionResult Login(LoginVM loginVM)
        {
            var result = employeeRepository.Login(loginVM);
            if (result == 6)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Email yang Anda Masukkan Salah!" });
            }
            else if (result == 7)
            {
                var getUserData = (from e in myContext.Employees
                                   join a in myContext.Accounts on e.NIK equals a.NIK
                                   join ar in myContext.AccountRoles on a.NIK equals ar.NIK
                                   join r in myContext.Roles on ar.RoleId equals r.RoleId
                                   orderby e.NIK
                                   select new
                                   {
                                       NIK = e.NIK,
                                       Email = e.Email,
                                       Role = r.RoleName
                                   }).Where(e => e.Email == loginVM.Email).ToList();
                List<string> listRole = new List<string>();
                foreach (var item in getUserData)
                {
                    listRole.Add(item.Role);
                }
                var data = new LoginVM()
                {
                    Email = loginVM.Email,
                    Role = listRole.ToArray()
                };

                var claims = new List<Claim>
                {
                    new Claim("email",data.Email)
                };
                foreach (var item in data.Role) 
                {
                    *//*new Claim("roles",item.ToString()),*//*
                    claims.Add(new Claim("roles", item.ToString()));
                }
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn
                    );
                var idtoken = new JwtSecurityTokenHandler().WriteToken(token);
                claims.Add(new Claim("TokenSecurity", idtoken.ToString()));
                return Ok(new { status = HttpStatusCode.OK, idtoken, message = "Login Berhasil!" });
            }
            else
            {
                return Ok(new { status = HttpStatusCode.BadRequest, result = result, message = "Login Gagal, Password Salah!" });
            }
        }*/

        /*[Authorize]
        [HttpGet("TestJwt")]
        public ActionResult TestJWT()
        {
            return Ok("Test JWT Berhasil");
        }*/

        /*[HttpGet]
        [Authorize(Roles = "Director")]
        [Route("SignManager")]
        public ActionResult SignManager(SignManagerVM signManagerVM)
        {
            var result = employeeRepository.SignManager(signManagerVM);
            if (result == 2)
            {
                var nik = signManagerVM.NIK;
                return BadRequest(new { status = HttpStatusCode.BadRequest, NIK = nik, message = "Data gagal dimasukkan" });
            }
            else
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data berhasil Ditambahkan" });
            }
        }*/

        /*[HttpGet]
        [Authorize(Roles = "Manager")]
        [Route("ForManager")]
        public string GetManager()
        {
            return "Web method for Manager";
        }

        [HttpGet]
        [Authorize(Roles = "Employee")]
        [Route("ForEmployee")]
        public string GetEmployee()
        {
            return "Web method for Employee";
        }*/

        /*[Route("Login")]
        [HttpPost]
        public ActionResult Login(LoginVM loginVM)
        {
            var result = employeeRepository.Login(loginVM);
            if (result == 6)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Email yang Anda Masukkan Salah!" });
            }
            else if (result == 7)
            {
                return Ok(new { status = HttpStatusCode.OK, message = "Berhasil Login!" });
            }
            else 
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Password yang Anda Masukkan Salah!" });
            }
        }*/

        /*[Route("Profile")]
        [HttpGet]
        public ActionResult<RegisterVM> GetProfile()
        {
            var getProfile = employeeRepository.GetProfile();
            if (getProfile.ToList().Count > 0)
            {
                return Ok(new { status = HttpStatusCode.OK, result = getProfile, message = "Data berhasil Ditambahkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getProfile, message = $"Data Tidak Ada" });
            }
        }*/

        /*[Route("Login")]
        [HttpGet]
        public ActionResult<LoginVM> GetLoginProfile()
        {
            var getLoginProfile = employeeRepository.GetLoginProfile();
            if (getLoginProfile.ToList().Count > 0)
            {
                return Ok(new { status = HttpStatusCode.OK, result = getLoginProfile, message = "Berhasil Login!" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getLoginProfile, message = "Email dan Password Tidak Terdaftar" });
            }
        }*/
        /*private readonly EmployeeRepository employeeRepository;
        public EmployeesController(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var ada = employeeRepository.Get();
            if (ada.Count() <= 0)
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = ada, message = $"Data Belum Ada" });
            }
            return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil ditampilkan" });
        }

        [HttpGet("{NIK}")]
        public ActionResult Get(string NIK)
        {
            var ada = employeeRepository.Get(NIK);
            if (ada != null)
            {
                return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil ditampilkan dengan Nik : {NIK}" });
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = ada, message = $"Data dengan NIK {NIK} tidak ditemukan" });
        }

        [HttpDelete("{NIK}")]
        public ActionResult Delete(string NIK)
        {
            var exist = employeeRepository.Get(NIK);
            try
            {
                var result = employeeRepository.Delete(exist.NIK);
                return Ok(new { status = HttpStatusCode.OK, result = result, message = $"Data dengan Nik : {NIK} berhasil dihapus" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = exist, message = $"Data dengan NIK {NIK} tidak ditemukan" });
            }
        }

        [HttpPatch("{NIK}")]
        public ActionResult Update(Employee employee, string NIK)
        {
            try
            {
                var result = employeeRepository.Update(employee);
                return Ok(new { status = HttpStatusCode.OK, message = $"Data dengan NIK {employee.NIK} berhasil diupdate" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data dengan NIK tersebut tidak ditemukan" });
            }
        }

        [HttpPost]
        public ActionResult Post(Employee employee)
        {
            var result = employeeRepository.Insert(employee);
            if (result == 2)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Gagal Dimasukan, NIK Sudah Terdaftar" });
            }
            else if (result == 3)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Gagal Dimasukan, Phone Sudah Terdaftar" });
            }
            else if (result == 4)
            {
                return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Gagal Dimasukan, Email Sudah Terdaftar" });
            }
            return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Berhasil Ditambahkan" });
        }*/
    }
}
