using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseAPIController
    {
        private readonly StoreContext context;

        public BuggyController(StoreContext context)
        {
            this.context = context;

        }

       
        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var prod = context.Products.Find(3746);
            if (prod== null){
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }

         [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
             var prod = context.Products.Find(3746);
             prod.ToString();
            return Ok();
        }


        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFound(int id)
        {
            return Ok();
        }
    }
}