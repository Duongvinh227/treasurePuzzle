using BE_Awing.Data;
using BE_Awing.Repositories;
using BE_Awing.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// SQLite DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=treasure.db"));

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddScoped<TreasureService, TreasureService>();
// DI Repository & Service
builder.Services.AddScoped<TreasureRepository, TreasureRepository>();
builder.Services.AddScoped<TreasureService, TreasureService>();

var app = builder.Build();

// **Tự động tạo DB nếu chưa tồn tại**
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Tạo DB & bảng nếu chưa tồn tại
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
