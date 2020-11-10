using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentSpecification(string paymentIntentId) 
        : base(c => c.PaymentIntentId == paymentIntentId )
        {
        
        }
    }
}