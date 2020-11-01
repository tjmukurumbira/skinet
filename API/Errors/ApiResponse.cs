using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message?? GetDefaultMessageForStatustatusCode(statusCode);
        }

        private string GetDefaultMessageForStatustatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 =>"A bad request, you have made",
                401 =>"Authorized, you are not",
                404 => "Resource found, it was not",
                500 =>"Server error, welcome to the darkside",
                _ => null
            };
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}