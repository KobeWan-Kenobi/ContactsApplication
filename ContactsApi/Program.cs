using Contacts.DataAccess.EF.Context;
using Contacts.DataAccess.EF.Models;
using Contacts.DataAccess.EF.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
namespace ContactsApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Allows React to make cross-origin calls
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactDev", policy =>
                {
                    policy.WithOrigins("http://localhost:5173", "https://localhost:44341", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddDbContext<ContactsDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("Contacts"));
            });
            builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<ContactsDbContext>();
            builder.Services.AddScoped<IContactRepository, ContactRepository>();
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();
            

            var app = builder.Build();
            app.UseCors("AllowReactDev");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }
            app.UseDefaultFiles();
            app.UseHttpsRedirection();


            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
