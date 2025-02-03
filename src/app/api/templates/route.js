export const templates = [
    {
      id: 1,
      name: "Free Trial Offer",
      preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLFLced9wpwuT5tl_ZdH8uDqPnrRXynHQjQ&s",
      subject: "Get special offer only for you!",
      btnText : "Take My Free Trial 3 Days ✈️",
      body: "We have an exclusive special offer just for you! Enjoy a trial with us for a limited time 👀",
      promo : "https://img.pikbest.com/backgrounds/20201007/special-offer-sale-fire-burn-template-discount-banner-promotion-concept-design-v_3122874jpg!w700wp",
      socialLinks: {
        instagram: true,
        facebook: true,
        website: true,
      },
    },
    {
      id: 2,
      name: "Welcome Email",
      preview: "https://cdn-icons-png.freepik.com/256/5167/5167400.png?semt=ais_hybrid",
      subject: "Welcome to our community!",
      btnText : "Explore Our community",
      body: "We're excited to have you join our community. Let's get started with your journey!",
      promo : "https://static.vecteezy.com/system/resources/previews/011/976/274/non_2x/stick-figures-welcome-free-vector.jpg",
      socialLinks: {
        instagram: true,
        facebook: true,
        website: true,
      },
    },
  ];

export async function GET() {
    
  
    return Response.json(templates, { status: 200 });
  }
  