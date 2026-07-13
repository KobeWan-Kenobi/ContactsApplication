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

            builder.Services.AddDbContext<ContactsDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("Contacts"));
            });
            builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<ContactsDbContext>();
            builder.Services.AddScoped<IContactRepository, ContactRepository>();
            builder.Services.AddControllers();
            builder.Services.AddOpenApi();
            // Allows React to make cross-origin calls
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactDev", policy =>
                {
                    policy.WithOrigins("http://localhost:5173", "https://localhost:44341/")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowReactDev");
            app.MapControllers();

            app.Run();
        }
    }
}
