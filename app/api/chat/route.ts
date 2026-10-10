export async function POST(req: Request) {
  const body = await req.json();
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const lastMessage = messages[messages.length - 1]?.content ?? '';

  if (!process.env.OPENAI_API_KEY) {
    const text = lastMessage.toLowerCase();

    if (text.includes('fix') || text.includes('error') || text.includes('bug')) {
      return Response.json({
        reply:
          'تمت مراجعة المشكلة. الخطأ الأكثر شيوعًا هو أن القيم غير متناسقة أو أن الاستيراد مفقود. أقترح أن تبدأ بتفحص الملف الذي يسبب التنفيذ، ثم أضف التحقق من القيم قبل استخدام المتغيرات.',
      });
    }

    if (text.includes('design') || text.includes('ui') || text.includes('landing')) {
      return Response.json({
        reply:
          'يمكنني أن أساعدك في تصميم واجهة احترافية: استخدم نظام ألوان متناسق، مساحة كافية، أزرار واضحة، وأقسام متدرجة. إذا أردت، أستطيع أن أكتب لك صفحة كاملة أو مكونات React جاهزة.',
      });
    }

    if (text.includes('video') || text.includes('image') || text.includes('post')) {
      return Response.json({
        reply:
          'يمكنني مساعدتك في إنشاء فكرة محتوى احترافية: عنوان, رسومات, تسلسل محتوى, CTA, وأبعاد مناسبة لكل منصة. أستطيع أيضًا تحويلها إلى نص جاهز للتنفيذ.',
      });
    }

    return Response.json({
      reply:
        'أنا مساعدك الرقمي داخل منصة Joo Door AI IDE. يمكنني: كتابة أو تصحيح الكود، شرح الملفات، إنشاء واجهات، تصميم منشورات، ووصف أعمال التطوير بشكل احترافي. ما الذي ترغب في إنجازه الآن؟',
    });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'أنت مساعد تقني احترافي في بيئة تطوير متكاملة. أجب بشكل واضح ومختصر وقدم اقتراحات عملية. إذا كان السؤال يتعلق بالكود فركز على الحل العملي، وإذا كان يتعلق بالمحتوى فقدم أفكار مناسبة.',
        },
        ...messages,
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return Response.json({
      reply: `حدث خطأ في AI provider: ${errorText}`,
    }, { status: 500 });
  }

  const data = await response.json();
  return Response.json({
    reply: data.choices?.[0]?.message?.content ?? 'لا يوجد رد مناسب.',
  });
}
