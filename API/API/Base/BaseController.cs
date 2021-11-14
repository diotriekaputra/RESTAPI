using API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<Entity, Repository, Key> : ControllerBase
        where Entity : class
        where Repository : IRepository<Entity, Key>
    {
        private readonly Repository repository;

        public BaseController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public ActionResult<Entity> Get()
        {
            var result = repository.Get();
            if (result.Count() <= 0)
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = $"Data Belum Ada" });
            }
            return Ok(result);
            /*return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil ditampilkan" });*/
        }
        [HttpGet("{Key}")]
        public ActionResult<Entity> Get(Key key)
        {
            var ada = repository.Get(key);
            if (ada != null)
            {
                return Ok(ada);
                /*return Ok(new { status = HttpStatusCode.OK, result = ada, message = $"Data berhasil ditampilkan dengan Nik : {key}" });*/
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = ada, message = $"Data dengan NIK {key} tidak ditemukan" });
        }
        [HttpPost]
        public ActionResult Post(Entity entity)
        {
            var result = repository.Insert(entity);
            /*return Ok(new { status = HttpStatusCode.OK, result = result, message = "Data Berhasil Ditambahkan" });*/
            return Ok(result);
        }
        [HttpDelete("{Key}")]
        public ActionResult<Entity> Delete(Key key)
        {
            var exist = repository.Get(key);
            try
            {
                var result = repository.Delete(key);
                return Ok(new { status = HttpStatusCode.OK, result = result, message = $"Data dengan Nik : {key} berhasil dihapus" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = exist, message = $"Data dengan NIK {key} tidak ditemukan" });
            }
        }
        [HttpPut("{Key}")]
        public ActionResult<Entity> Update(Entity entity, Key key)
        {
            try
            {
                var result = repository.Update(entity, key);
                return Ok(new { status = HttpStatusCode.OK, message = $"Data  berhasil diupdate" });
            }
            catch
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data dengan NIK tersebut tidak ditemukan" });
            }
        }

        /*[HttpGet]
        public ActionResult<Entity> Get()
        {
            var result = repository.Get();
            return Ok(result);
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
