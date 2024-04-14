const cardTarot = {
    'El Loco': {
        derecho:
            'El Loco representa la libertad, la espontaneidad y la aventura. Es hora de tomar riesgos y explorar nuevas posibilidades en tu vida.',
        revés: 'El Loco en posición invertida puede indicar impulsividad, falta de planificación o riesgos imprudentes. Debes tener cuidado de no actuar de manera precipitada y considerar las consecuencias de tus acciones.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243370409119794/image-001.jpg?ex=655bf864&is=65498364&hm=44d4fb72c067f4ad14572311ec1b31e7ada6e5cbf42f5b4eb2d8796bf1057d56&=',
    },
    'El Mago': {
        derecho:
            'El Mago simboliza el poder y la habilidad para manifestar tus deseos. Tienes el potencial de lograr tus metas con tus talentos y recursos actuales.',
        revés: 'El Mago en posición invertida puede indicar falta de enfoque o habilidades mal utilizadas. Es posible que estés desperdiciando tu potencial o que necesites reevaluar tus objetivos y métodos.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243370656575548/image-002.jpg?ex=655bf864&is=65498364&hm=23ee5ea22e9e238ce86c95497693f56ff87de9fa452a2ef0cefd0bd9615d4851&=',
    },
    'La Sacerdotisa': {
        derecho:
            'La Sacerdotisa es un símbolo de intuición y sabiduría interior. Escucha a tu intuición y profundiza en tu conocimiento interior.',
        revés: 'La Sacerdotisa en posición invertida puede indicar desconexión con tu intuición o falta de sabiduría interior. Es posible que estés ignorando señales importantes o que necesites buscar más profundamente dentro de ti mismo para encontrar respuestas.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243370887266355/image-003.jpg?ex=655bf864&is=65498364&hm=bb8ee314a2ad5c950ec78d6b5503e95738b8c2246fce1c6407d0b8158078d2bf&=',
    },
    'La Emperatriz': {
        derecho:
            'La Emperatriz representa la fertilidad, la abundancia y el amor maternal. Es un buen momento para nutrir y cuidar de las personas que te importan.',
        revés: 'La Emperatriz en posición invertida puede indicar falta de cuidado o preocupación excesiva por los demás. Es posible que estés descuidando tus propias necesidades o que estés siendo demasiado controlador en tus relaciones.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243371109568592/image-004.jpg?ex=655bf864&is=65498364&hm=24df1609ec1ba5921f17e6d83f9b098be2a88c9cf1d4f8407b5ec68f25eae26b&=',
    },
    'El Emperador': {
        derecho:
            'El Emperador simboliza el control y la autoridad. Debes asumir el control de tu vida y tomar decisiones con determinación.',
        revés: 'El Emperador en posición invertida puede indicar falta de control o abuso de poder. Es posible que estés siendo dominado por otros o que necesites establecer límites más claros en tus relaciones.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243371340247040/image-005.jpg?ex=655bf864&is=65498364&hm=deda419f10664ceea27d1bb711ecef8930119c5764903cb6fab9e2b26e621408&=',
    },
    'El Papa': {
        derecho:
            'El Papa simboliza la espiritualidad y la guía. Puede indicar la necesidad de buscar orientación espiritual o consejo de una figura de autoridad.',
        revés: 'El Papa en posición invertida puede indicar falta de fe o dirección espiritual. Es posible que estés sintiéndote perdido o confundido en tu camino espiritual, o que necesites cuestionar las enseñanzas tradicionales y buscar tu propia verdad.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243371596103780/image-006.jpg?ex=655bf864&is=65498364&hm=823d073d73d25e85b57ba1474c538c0871db26f2f88f9dd9f16836e195531def&=',
    },
    'Los Enamorados': {
        derecho:
            'Los Enamorados representan el amor, las decisiones importantes y la dualidad. Toma decisiones basadas en el corazón y el alma.',
        revés: 'Los Enamorados en posición invertida pueden indicar indecisión o conflicto interno. Es posible que estés luchando con una decisión importante o que tus emociones estén en conflicto. Necesitas sintonizarte con tus verdaderos deseos y valores antes de tomar una decisión.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243371847766076/image-007.jpg?ex=655bf864&is=65498364&hm=6a896a0fcfbec58d464a81c01e3c4dd311739ceb12ba35276b29fe20262a4021&=',
    },

    'El Carro': {
        derecho:
            'El Carro representa el control y el avance. Debes ser determinado y enfocado para alcanzar tus metas.',
        revés: 'El Carro en posición invertida puede indicar falta de dirección o desviación de tus objetivos. Es posible que estés enfrentando obstáculos o que necesites reevaluar tu enfoque para lograr el éxito.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243372233633813/image-008.jpg?ex=655bf864&is=65498364&hm=0bb34745da451d2c5a4170160ba528fda5a6a77ea6b426cab841bbfbf243be1a&=',
    },
    'La Justicia': {
        derecho:
            'La Justicia simboliza la equidad y el equilibrio. Debes tomar decisiones justas y asumir la responsabilidad de tus acciones.',
        revés: 'La Justicia en posición invertida puede indicar injusticia o falta de responsabilidad. Es posible que estés evadiendo las consecuencias de tus acciones o que necesites reevaluar tus valores y principios morales.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243372485296169/image-009.jpg?ex=655bf864&is=65498364&hm=71427a7d1338506e6ca3b6c37fc4c0c7337f94b51dcb35e6bbbd26ff01bd7ad5&=',
    },
    'El Ermitaño': {
        derecho:
            'El Ermitaño representa la soledad y la introspección. Es un momento para la reflexión y la búsqueda de respuestas internas.',
        revés: 'El Ermitaño en posición invertida puede indicar aislamiento o negación de la verdad. Es posible que estés evitando enfrentar tus problemas o que necesites abrirte a la ayuda y orientación de los demás.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243447466860615/image-010.jpg?ex=655bf876&is=65498376&hm=c0e7ac3f72d985bf92a4d556d79275409e4479c85cb6221754908739d818516b&=',
    },
    'La Rueda de la Fortuna': {
        derecho:
            'La Rueda de la Fortuna indica cambios y giros inesperados en tu vida. Prepárate para la evolución y la transformación.',
        revés: 'La Rueda de la Fortuna en posición invertida puede indicar resistencia al cambio o estancamiento. Es posible que estés luchando contra el flujo natural de la vida o que necesites tomar medidas para recuperar el control de tu destino.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243447965974629/image-011.jpg?ex=655bf876&is=65498376&hm=e19101b7cfc8347386e17fa9a64893ae121529ee18d7e9ab3c64aababd2b2ffb&=',
    },
    'La Fuerza': {
        derecho:
            'La Fuerza simboliza el coraje y la determinación. Debes superar desafíos con compasión y control interno.',
        revés: 'La Fuerza en posición invertida puede indicar falta de fuerza o autocontrol. Es posible que estés sintiéndote impotente frente a los desafíos o que necesites encontrar nuevas formas de enfrentar tus miedos y debilidades.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243448314110023/image-012.jpg?ex=655bf876&is=65498376&hm=18a938fbb62aae297454b244df2c6389e9962eff24c30e152925609c3c40e8cf&=',
    },
    'El Colgado': {
        derecho:
            'El Colgado representa la rendición y la perspectiva. Debes dejar ir las cosas que no puedes controlar y ganar una nueva perspectiva.',
        revés: 'El Colgado en posición invertida puede indicar resistencia al cambio o sacrificio innecesario. Es posible que estés aferrándote a situaciones o relaciones que te impiden crecer o que necesites reevaluar tus prioridades y valores.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243448641257492/image-013.jpg?ex=655bf876&is=65498376&hm=d058774d087d57349c5b01912d9f522fc479890a6ce59afd71ad1ab1dcb230cc&=',
    },
    'La Muerte': {
        derecho:
            'La Muerte representa transformación y cambio. Deja ir lo viejo para dar paso a lo nuevo y renacer.',
        revés: 'La Muerte en posición invertida puede indicar resistencia al cambio o estancamiento. Es posible que estés aferrándote al pasado o que necesites liberarte de patrones destructivos para poder avanzar.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243449312354324/image-014.jpg?ex=655bf876&is=65498376&hm=b14cc751a36cf1c8a1c078d4a4aa8d9cc9cfdac045b45b9efe258c08386cbcda&=',
    },
    'La Templanza': {
        derecho:
            'La Templanza simboliza la armonía y el equilibrio. Encuentra la moderación en tu vida y busca la paz interior.',
        revés: 'La Templanza en posición invertida puede indicar desequilibrio o conflicto interno. Es posible que estés luchando por encontrar un equilibrio en tu vida o que necesites hacer ajustes para restaurar la armonía y la estabilidad.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243449706610718/image-015.jpg?ex=655bf877&is=65498377&hm=06255f1e3be18a23b6e0ab9411c43b5b3c20cf12e0f22d117d0895addb4476f2&=',
    },
    'El Diablo': {
        derecho:
            'El Diablo representa la tentación y los deseos terrenales. Ten cuidado con las trampas y las adicciones.',
        revés: 'El Diablo en posición invertida puede indicar liberación o superación de la negatividad. Es posible que estés encontrando la fuerza para superar adicciones o comportamientos destructivos, o que necesites liberarte de relaciones o situaciones que te están reteniendo.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243450247692348/image-016.jpg?ex=655bf877&is=65498377&hm=6055a650bb3a4879f921f72c45095b3d54ffd2ef2d7e80741257a13c6d020bcc&=',
    },
    'La Torre': {
        derecho:
            'La Torre simboliza cambios repentinos y revelaciones. Prepárate para desafíos inesperados y cambios radicales.',
        revés: 'La Torre en posición invertida puede indicar evasión o resistencia al cambio. Es posible que estés tratando de evitar enfrentar la verdad o que necesites prepararte para cambios inevitables en tu vida.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243450675494933/image-017.jpg?ex=655bf877&is=65498377&hm=2ac3fd971299a07a6c0a71f078b055ed397caf8959e033ef73ead2a98224cdca&=',
    },
    'La Estrella': {
        derecho:
            'La Estrella representa la esperanza y la inspiración. Sigue tus sueños y mantén la fe en un futuro mejor.',
        revés: 'La Estrella en posición invertida puede indicar desilusión o falta de fe en el futuro. Es posible que estés perdiendo la esperanza o que necesites encontrar nuevas fuentes de inspiración y motivación en tu vida.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243451040415824/image-018.jpg?ex=655bf877&is=65498377&hm=0c03b75ad0e3daa741fb5569a756e172e899dddbab856e230de072145ac204cd&=',
    },
    'La Luna': {
        derecho:
            'La Luna simboliza la intuición y la confusión. Debes enfrentar tus miedos y confiar en tu intuición.',
        revés: 'La Luna en posición invertida puede indicar claridad o superación de la confusión. Es posible que estés encontrando la verdad o que necesites confiar más en tu intuición para guiar tus decisiones.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243451342397511/image-019.jpg?ex=655bf877&is=65498377&hm=63fc1efd4dfd2b80bb4be85366aab4cedbdb1d3af4cb6b6bcc96874ec91323a3&=',
    },
    'El Sol': {
        derecho:
            'El Sol representa la alegría y la claridad. Brilla con confianza y positividad en tu vida.',
        revés: 'El Sol en posición invertida puede indicar falta de alegría o negatividad. Es posible que estés luchando contra la tristeza o que necesites encontrar formas de iluminar tu vida y encontrar la felicidad.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243508204572672/image-020.jpg?ex=655bf885&is=65498385&hm=be9a72024a6102f45c4d89d7ed42d2a30a441804ce6fd02896ee186ec49ecabe&=',
    },
    'El Juicio': {
        derecho:
            'El Juicio simboliza la evaluación y la redención. Es el momento de tomar responsabilidad por tus acciones y buscar la renovación.',
        revés: 'El Juicio en posición invertida puede indicar falta de evaluación o resistencia a la redención. Es posible que estés evitando enfrentar las consecuencias de tus acciones o que necesites perdonarte a ti mismo para poder seguir adelante.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243508997312542/image-021.jpg?ex=655bf885&is=65498385&hm=8bf9963e931da853798e77e6615ebfe5f2ca872c949dcfd0f7086133e969cb73&=',
    },
    'El Mundo': {
        derecho:
            'El Mundo simboliza la realización y la culminación. Has alcanzado un nivel de logro y completitud en tu vida.',
        revés: 'El Mundo en posición invertida puede indicar falta de realización o incompletitud. Es posible que estés luchando por alcanzar tus metas o que necesites ampliar tu perspectiva para encontrar un sentido de logro y plenitud en tu vida.',
        image: 'https://media.discordapp.net/attachments/1171243107031978105/1171243509429317642/image-022.jpg?ex=655bf885&is=65498385&hm=22f6e63382274a98f84d12a9f0a405114530641541e49cb31b30c158197266ba&=',
    },
};
export default cardTarot;
/*
                    'El Carro': 'https://media.discordapp.net/attachments/1171243107031978105/1171243372233633813/image-008.jpg?ex=655bf864&is=65498364&hm=0bb34745da451d2c5a4170160ba528fda5a6a77ea6b426cab841bbfbf243be1a&=',
                    'La Justicia': 'https://media.discordapp.net/attachments/1171243107031978105/1171243372485296169/image-009.jpg?ex=655bf864&is=65498364&hm=71427a7d1338506e6ca3b6c37fc4c0c7337f94b51dcb35e6bbbd26ff01bd7ad5&=',
                    'El Ermitaño': 'https://media.discordapp.net/attachments/1171243107031978105/1171243447466860615/image-010.jpg?ex=655bf876&is=65498376&hm=c0e7ac3f72d985bf92a4d556d79275409e4479c85cb6221754908739d818516b&=',
                    'La Rueda de la Fortuna': 'https://media.discordapp.net/attachments/1171243107031978105/1171243447965974629/image-011.jpg?ex=655bf876&is=65498376&hm=e19101b7cfc8347386e17fa9a64893ae121529ee18d7e9ab3c64aababd2b2ffb&=',
                    'La Fuerza': 'https://media.discordapp.net/attachments/1171243107031978105/1171243448314110023/image-012.jpg?ex=655bf876&is=65498376&hm=18a938fbb62aae297454b244df2c6389e9962eff24c30e152925609c3c40e8cf&=',
                    'El Colgado': 'https://media.discordapp.net/attachments/1171243107031978105/1171243448641257492/image-013.jpg?ex=655bf876&is=65498376&hm=d058774d087d57349c5b01912d9f522fc479890a6ce59afd71ad1ab1dcb230cc&=',
                    'La Muerte': 'https://media.discordapp.net/attachments/1171243107031978105/1171243449312354324/image-014.jpg?ex=655bf876&is=65498376&hm=b14cc751a36cf1c8a1c078d4a4aa8d9cc9cfdac045b45b9efe258c08386cbcda&=',
                    'La Templanza': 'https://media.discordapp.net/attachments/1171243107031978105/1171243449706610718/image-015.jpg?ex=655bf877&is=65498377&hm=06255f1e3be18a23b6e0ab9411c43b5b3c20cf12e0f22d117d0895addb4476f2&=',
                    'El Diablo': 'https://media.discordapp.net/attachments/1171243107031978105/1171243450247692348/image-016.jpg?ex=655bf877&is=65498377&hm=6055a650bb3a4879f921f72c45095b3d54ffd2ef2d7e80741257a13c6d020bcc&=',
                    'La Torre': 'https://media.discordapp.net/attachments/1171243107031978105/1171243450675494933/image-017.jpg?ex=655bf877&is=65498377&hm=2ac3fd971299a07a6c0a71f078b055ed397caf8959e033ef73ead2a98224cdca&=',
                    'La Estrella': 'https://media.discordapp.net/attachments/1171243107031978105/1171243451040415824/image-018.jpg?ex=655bf877&is=65498377&hm=0c03b75ad0e3daa741fb5569a756e172e899dddbab856e230de072145ac204cd&=',
                    'La Luna': 'https://media.discordapp.net/attachments/1171243107031978105/1171243451342397511/image-019.jpg?ex=655bf877&is=65498377&hm=63fc1efd4dfd2b80bb4be85366aab4cedbdb1d3af4cb6b6bcc96874ec91323a3&=',
                    'El Sol': 'https://media.discordapp.net/attachments/1171243107031978105/1171243508204572672/image-020.jpg?ex=655bf885&is=65498385&hm=be9a72024a6102f45c4d89d7ed42d2a30a441804ce6fd02896ee186ec49ecabe&=',
                    'El Juicio': 'https://media.discordapp.net/attachments/1171243107031978105/1171243508997312542/image-021.jpg?ex=655bf885&is=65498385&hm=8bf9963e931da853798e77e6615ebfe5f2ca872c949dcfd0f7086133e969cb73&=',
                    'El Mundo': 'https://media.discordapp.net/attachments/1171243107031978105/1171243509429317642/image-022.jpg?ex=655bf885&is=65498385&hm=22f6e63382274a98f84d12a9f0a405114530641541e49cb31b30c158197266ba&=',
*/
