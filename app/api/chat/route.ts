export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const lastMessage = messages[messages.length - 1]?.content ?? '';
    const text = String(lastMessage).toLowerCase();

    if (!process.env.OPENAI_API_KEY) {
      if (text.includes('fix') || text.includes('error') || text.includes('bug')) {
        return Response.json({
          reply:
            'تمت مراجعة المشكلة. في أغلب الحالات، السبب هو وجود خطأ في الاستيراد أو اختلاف في القيم أو عدم تطابق اسم المتغيرات. أبدأ بتحديد الملف الذي يسبب المشكلة، ثم أراجع كل نقطة استخدام للمتغيرات والوظ��ئف قبل التصحيح.',
        });
      }

      if (text.includes('design') || text.includes('ui') || text.includes('landing')) {
        return Response.json({
          reply:
            'أستطيع مساعدتك في تصميم واجهة احترافية: تحديد الألوان، تقسيم الصفحة، إنشاء أقسام الرسالة، ملف CSS مقسم بشكل نظيف، وواجهة تدعم الهاتف والكمبيوتر. أستطيع أيضًا كتابة مكونات React كاملة.',
        });
      }

      if (text.includes('video') || text.includes('image') || text.includes('post')) {
        return Response.json({
          reply:
            'من الأفضل أن تبدأ بفكرة واضحة: الهدف، الجمهور، الرسالة الأساسية، CTA، وأبعاد المحتوى لكل منصة. أستطيع تحويل هذه الفكرة إلى نص احترافي أو سيناريو جاهز للتنفيذ.',
        });
      }

      return Response.json({
        reply:
          'أنا مساعدك التقني داخل Joo Door AI IDE. أستطيع مساعدتك في: تصحيح الأكواد، كتابة واجهات، تحسين المشروع، تحليل الأخطاء، وتوليد محتوى احترافي. أخبرني ما الذي تريد إنجازه الآن؟',
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
              'أنت مساعد تقني محترف داخل منصة تطوير. أجب بوضوح، مختصر، ومبني على الحل العملي. ركز على اكتشاف المشكلة، تقديم الحل، تحسين جودة الكود، وتقديم اقتراحات عملية. إذا كان السؤال غير واضح اطلب توضيحًا.',
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        { reply: `حدث خطأ في مزود الذكاء: ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    return Response.json({
      reply: data.choices?.[0]?.message?.content ?? 'لا يوجد رد مناسب.',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { reply: 'عذراً، حدث خطأ أثناء معالجة الرسالة. حاول مرة أخرى.' },
      { status: 500 }
    );
  }
}
