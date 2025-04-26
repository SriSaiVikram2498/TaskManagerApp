using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using ToDoListApi.Data;
using ToDoListApi.Data.Entities;
using ToDoListApi.Models;
using ToDoListApi.Services.JwtTokenService;

namespace ToDoListApi.Services.LoginService
{
    
    public class LoginService : ILoginService
    {
        public async Task<bool> ResetPasswordAsync(ForgotPasswordModel model)
        {
            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
            if (user == null) return false;

            using var hmac = new HMACSHA512();
            user.PasswordSalt = hmac.Key;
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.NewPassword));
            
            await _appDbContext.SaveChangesAsync();
            return true;
        }


        private readonly AppDbContext _appDbContext;
        private readonly IJwtTokenService _jwtTokenService;

        public LoginService(AppDbContext appDbContext,
                            IJwtTokenService jwtTokenService)
        {
            _appDbContext = appDbContext;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<User?> IsExists(LoginModel login)
        {
            User? user = await _appDbContext.Users.SingleOrDefaultAsync(x =>
                x.Username == login.Username);
            return user;
        }

        public UserModel? Login(User user, LoginModel login)
        {
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (var i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return default;
                }
            }

            return new UserModel
            {
                Username = user.Username,
                Token = _jwtTokenService.CreateToken(user)
            };
        }
    }
}
