﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
/*using System.Text.Json.Serialization;*/
using System.Threading.Tasks;

namespace API.Models
{
    [Table("Tb_M_Account")]
    public class Account
    {

        [Key]
        public string NIK { get; set; }
        public string Password { get; set; }
        [JsonIgnore]
        public virtual Employee Employee { get; set; }
        [JsonIgnore]
        public virtual Profiling Profiling { get; set; }
        [JsonIgnore]
        public virtual ICollection<AccountRole> AccountRoles { get; set; }
    }
}
