import { IEvent } from "@/lib/database/models/event.model"
import { Button } from "../ui/button"

import { loadStripe } from "@stripe/stripe-js"
import { useEffect } from "react"
import { CheckoutOrderParams } from "@/types"
import { checkoutOrder } from "@/lib/actions/order.actions"

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutProps {
  event: IEvent
  userId: string
}

const Checkout = ({ event, userId }: CheckoutProps) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.")
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      )
    }
  }, [])

  const onCheckout = async () => {
    const order: CheckoutOrderParams = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    }

    await checkoutOrder(order)
  }
  return (
    <form action={onCheckout} method="POST">
      <Button type="submit" role="link" size="lg">
        {event.isFree ? "Get Tickets" : "Buy ticket"}
      </Button>
    </form>
  )
}

export default Checkout