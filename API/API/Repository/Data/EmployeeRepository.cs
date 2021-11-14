using API.Context;
using API.Models;
using API.ViewModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<MyContext, Employee, string>
    {
        private static string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }

        private readonly MyContext myContext;
        public EmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public int Register(RegisterVM registerVM)
        {
            Employee employee = new Employee();
            University university = new University();
            AccountRole accountRole = new AccountRole();
            /*Role role = new Role();*/
            var checkUniversity = myContext.Universities.Find(registerVM.UniversityId);
            var checkData = myContext.Employees.Find(registerVM.NIK);
            var checkPhone = myContext.Employees.Where(employee => employee.PhoneNumber == registerVM.PhoneNumber).FirstOrDefault();
            var checkEmail = myContext.Employees.Where(employee => employee.Email == registerVM.Email).FirstOrDefault();
            employee.NIK = registerVM.NIK;
            if (checkData != null)
            {
                return 2;
            }

            employee.FirstName = registerVM.FirstName;
            employee.LastName = registerVM.LastName;
            employee.PhoneNumber = registerVM.PhoneNumber;
            if (checkPhone != null)
            {
                return 3;
            }

            employee.BirthDate = registerVM.BirthDate;
            employee.Salary = registerVM.Salary;
            employee.Email = registerVM.Email;
            employee.Gender = (Models.Gender)registerVM.Gender;
            if (checkEmail != null)
            {
                return 4;
            }
            myContext.Employees.Add(employee);
            myContext.SaveChanges();

            Account account = new Account();
            account.NIK = registerVM.NIK;
            account.Password = BCrypt.Net.BCrypt.HashPassword(registerVM.Password, GetRandomSalt());
            myContext.Accounts.Add(account);
            myContext.SaveChanges();

            Education education = new Education();
            education.Degree = registerVM.Degree;
            education.GPA = registerVM.GPA;
            education.UniversityId = registerVM.UniversityId;
            if (checkUniversity == null)
            {
                return 5;
            }
            myContext.Educations.Add(education);
            myContext.SaveChanges();

            Profiling profiling = new Profiling();
            profiling.NIK = registerVM.NIK;
            profiling.EducationId = education.EducationId;
            myContext.Profilings.Add(profiling);
            var result = myContext.SaveChanges();

            accountRole.NIK = account.NIK;
            accountRole.RoleId = registerVM.RoleId;
            myContext.AccountRoles.Add(accountRole);
            myContext.SaveChanges();

            return result;
        }

        public IEnumerable<RegisterVM> GetProfile()
        {
            var query = (from e in myContext.Employees
                         join a in myContext.Accounts on e.NIK equals a.NIK
                         join p in myContext.Profilings on a.NIK equals p.NIK
                         join ed in myContext.Educations on p.EducationId equals ed.EducationId
                         join u in myContext.Universities on ed.UniversityId equals u.UniversityId
                         join ar in myContext.AccountRoles on a.NIK equals ar.NIK
                         join r in myContext.Roles on ar.RoleId equals r.RoleId
                         orderby e.NIK
                         select new RegisterVM
                         {
                             NIK = e.NIK,
                             FirstName = e.FirstName,
                             LastName = e.LastName,
                             PhoneNumber = e.PhoneNumber,
                             BirthDate = e.BirthDate,
                             Salary = e.Salary,
                             Email = e.Email,
                             Gender = (ViewModel.Gender)e.Gender,
                             Password = a.Password,
                             Degree = ed.Degree,
                             GPA = ed.GPA,
                             UniversityId = ed.UniversityId,
                             RoleId = r.RoleId
                         }).ToList();
            return query;
        }

        public RegisterVM GetProfileNik(string NIK)
        {
            var query = (from e in myContext.Employees
                         join a in myContext.Accounts on e.NIK equals a.NIK
                         join p in myContext.Profilings on a.NIK equals p.NIK
                         join ed in myContext.Educations on p.EducationId equals ed.EducationId
                         join u in myContext.Universities on ed.UniversityId equals u.UniversityId
                         join ar in myContext.AccountRoles on a.NIK equals ar.NIK
                         join r in myContext.Roles on ar.RoleId equals r.RoleId
                         orderby e.NIK
                         select new RegisterVM
                         {
                             NIK = e.NIK,
                             FirstName = e.FirstName,
                             LastName = e.LastName,
                             PhoneNumber = e.PhoneNumber,
                             BirthDate = e.BirthDate,
                             Salary = e.Salary,
                             Email = e.Email,
                             Gender = (ViewModel.Gender)e.Gender,
                             Password = a.Password,
                             Degree = ed.Degree,
                             GPA = ed.GPA,
                             UniversityId = ed.UniversityId,
                             RoleId = r.RoleId
                         }).Where(e => e.NIK == NIK).FirstOrDefault();
            return query;
        }

        public int Login(LoginVM loginVM)
        {
            Employee employee = new Employee();
            Account account = new Account();
            var checkEmail = myContext.Employees.Where(employee => employee.Email == loginVM.Email).FirstOrDefault();
            /*var checkEmail = myContext.Employees.Find(loginVM.Email);*/
            if (checkEmail == null)
            {
                return 2;
            }

            var checkPassword = myContext.Accounts.Find(checkEmail.NIK);
            bool validPassword = BCrypt.Net.BCrypt.Verify(loginVM.Password, checkPassword.Password);
            if (validPassword)
            {
                return 3;
            }
            else 
            {
                return 4;
            }
        }

        public IEnumerable GetGender()
        {
            var result = from emp in myContext.Employees
                          group emp by emp.Gender into x
                          select new
                          {
                              gender = x.Key,
                              value = x.Count()
                          };
            return result;
        }

        public IEnumerable GetRole()
        {
            var result = from emp in myContext.AccountRoles
                         group emp by emp.RoleId into x
                         select new
                         {
                             roleId = x.Key,
                             value = x.Count()
                         };
            return result;
        }

        public IEnumerable GetSalary()
        {
            var result = from emp in myContext.Employees
                         group emp by emp.Salary into x
                         select new
                         {
                             salary = x.Key,
                             value = x.Count()
                         };
            return result;
        }

        public IEnumerable GetDegree()
        {
            var result = from emp in myContext.Educations
                         group emp by emp.Degree into x
                         select new
                         {
                             degree = x.Key,
                             value = x.Count()
                         };
            return result;
        }

        /*public int SignManager(SignManagerVM signManagerVM)
        {
            Employee employee = new Employee();
            var checkdata = myContext.Employees.Find(signManagerVM.NIK);
            employee.NIK = signManagerVM.NIK;
            if (checkdata == null)
            {
                return 2;
            }
            AccountRole accountRole = new AccountRole();
            accountRole.NIK = signManagerVM.NIK;
            accountRole.RoleId = 1;
            myContext.AccountRoles.Add(accountRole);
            var result = myContext.SaveChanges();
            return result;

            *//*try
            {
                myContext.AccountRoles.Add(accountRole);
                var result = myContext.SaveChanges();
                return result;
            }
            catch
            {
                return 0;
            }*//*
        }*/

        public string[] GetRole(string email)
        {
            var getData = myContext.Employees.Where(e => e.Email == email).FirstOrDefault();
            var getRole = (from acr in myContext.AccountRoles
                           join r in myContext.Roles
                           on acr.RoleId equals r.RoleId
                           select new
                           {
                               NIK = acr.NIK,
                               RoleName = r.RoleName
                           }).Where(acr => acr.NIK == getData.NIK).ToList();

            List<string> result = new List<string>();

            foreach (var item in getRole)
            {
                result.Add(item.RoleName);
            }

            return result.ToArray();
        }

        public int SignManager(AccountRole accountRole)
        {
            try
            {
                myContext.AccountRoles.Add(accountRole);
                var result = myContext.SaveChanges();
                return result;
            }
            catch
            {
                return 0;
            }
        }

        /*public IEnumerable<LoginVM> GetLoginProfile()
        {
            var query = (from e in myContext.Employees
                         join a in myContext.Accounts on e.NIK equals a.NIK
                         orderby e.NIK
                         select new LoginVM
                         {
                             NIK = e.NIK,
                             Email = e.Email,
                             Password = a.Password,
                         }).ToList();
            return query;
        }*/

        /*public class Hashing
        {
            private static string GetRandomSalt()
            {
                return.BCrypt.Net.BCrypt.GenerateSalt(12);
            }
            public static string HashPassword(string password)
            {
                return.BCrypt.Net.BCrypt.HashPassword(password, GetRandomSalt());
            }
            public static bool ValidatePassword(string password, string correctHash)
            {
                return BCrypt.Net.BCrypt.Verify(password, correctHash);
            }
        }*/

        /*public IEnumerable<RegisterVM> GetProfile()
            {
                var query = (from e in myContext.Employees
                             join a in myContext.Accounts on e.NIK equals a.NIK
                             join p in myContext.Profilings on a.NIK equals p.NIK
                             join ed in myContext.Educations on p.EducationId equals ed.Id
                             join u in myContext.Universities on ed.UniversityId equals u.Id
                             orderby e.NIK
                             select new RegisterVM
                             {
                                 NIK = e.NIK,
                                 FirstName = e.FirstName,
                                 LastName = e.LastName,
                                 PhoneNumber = e.PhoneNumber,
                                 BirthDate = e.BirthDate,
                                 Salary = e.Salary,
                                 Email = e.Email,
                                 Password = a.Password,
                                 Degree = ed.Degree,
                                 GPA = ed.GPA,
                                 UniversityId = ed.UniversityId
                             }).ToList();
                return query;
            }*/
        /*var employeeResult = new Employee
        {
            NIK = registerVM.NIK,
            FirstName = registerVM.FirstName,
            LastName = registerVM.LastName,
            BirthDate = registerVM.BirthDate,
            Phone = registerVM.PhoneNumber,
            Email = registerVM.Email,
            Account = new Account
            {
                NIK = registerVM.NIK,
                Password = registerVM.Password,
                Profiling = new Profiling
                {
                    NIK = registerVM.NIK,
                    Education = new Education
                    {
                        Degree = registerVM.Degree,
                        Gpa = registerVM.Gpa,
                        University = new University
                        {
                            Id = registerVM.UniversityId,
                            Name = "test"
                        }
                    }
                }
            }
        };
        myContext.Employees.Add(employeeResult);
        var result = myContext.SaveChanges();
        return result;*/

        /*internal object Register(RegisterVM registerVM)
        {
            throw new NotImplementedException();
        }*/
    }
}
