using System;
using System.Collections.Generic;
using Contacts.DataAccess.EF.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts.DataAccess.EF.Context;

public partial class ContactsContext : DbContext
{
    public ContactsContext()
    {
    }

    public ContactsContext(DbContextOptions<ContactsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Contact> Contacts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("contacts");

            entity.Property(e => e.ContactId)
                .ValueGeneratedOnAdd()
                .HasColumnName("contact_id");
            entity.Property(e => e.Email)
                .HasMaxLength(128)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(64)
                .HasColumnName("full_name");
            entity.Property(e => e.IsFavorite).HasColumnName("is_favorite");
            entity.Property(e => e.Phone)
                .HasMaxLength(16)
                .IsFixedLength()
                .HasColumnName("phone");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
