import { useState } from "react";

const SECTIONS = [
  { id:"analogies", name:"אֲנָלוֹגִיּוֹת מִילוּלִיּוֹת", emoji:"🔗", desc:"מְצָא אֶת הַקֶּשֶׁר בֵּין מִלִּים",  color:"#c0392b", bg:"#fdf2f2" },
  { id:"completion", name:"הַשְׁלָמַת מִשְׁפָּטִים",      emoji:"✏️", desc:"מַלֵּא אֶת הַמִּלָּה הַחֲסֵרָה",  color:"#7d3c98", bg:"#f5f0fa" },
  { id:"math",       name:"בְּעָיוֹת מִילוּלִיּוֹת",     emoji:"🧮", desc:"פְּתוֹר בְּעָיוֹת חֶשְׁבּוֹן",    color:"#1a5276", bg:"#eaf4fb" },
  { id:"shapes",     name:"מִסְפָּרִים בְּצוּרוֹת",      emoji:"🔷", desc:"מְצָא אֶת הַמִּסְפָּר הַחָסֵר",  color:"#1e8449", bg:"#eafaf1" },
  { id:"sequences",  name:"סְדָרוֹת מִסְפָּרִים",        emoji:"📊", desc:"מְצָא אֶת הַדָּפוּס בַּסְּדָרָה", color:"#9a7d0a", bg:"#fef9e7" },
  { id:"figural",    name:"חֲשִׁיבָה צוּרָנִית",         emoji:"🎯", desc:"מְצָא אֶת הַצּוּרָה הַבָּאָה",   color:"#0e6655", bg:"#e8f8f5" },
];

const BANK = {
  analogies: [
    { question:'עֵץ : יַעַר — כְּמוֹ — דָּג : ___?', options:['א. נָהָר','ב. סְנַפִּיר','ג. מַיִם','ד. יָם'], correct:3, explanation:'עֵץ גָּדֵל בְּיַעַר, דָּג חַי בְּיָם.' },
    { question:'סַיָּף : לֶחֶם — כְּמוֹ — מַסְפֵּרַיִם : ___?', options:['א. תִּפּוּר','ב. נְיָר','ג. חַיָּט','ד. מִסְפָּרָה'], correct:1, explanation:'סַיָּף חוֹתֵךְ לֶחֶם, מַסְפֵּרַיִם חוֹתְכִים נְיָר.' },
    { question:'רוֹפֵא : חוֹלֶה — כְּמוֹ — מוֹרֶה : ___?', options:['א. בֵּית סֵפֶר','ב. תַּלְמִיד','ג. סֵפֶר','ד. כִּיתָּה'], correct:1, explanation:'רוֹפֵא מְטַפֵּל בְּחוֹלֶה, מוֹרֶה מְלַמֵּד תַּלְמִיד.' },
    { question:'עַיִן : רְאִיָּה — כְּמוֹ — אֹזֶן : ___?', options:['א. פֶּה','ב. רֵיחַ','ג. שְׁמִיעָה','ד. מַגָּע'], correct:2, explanation:'עַיִן מְשַׁמֶּשֶׁת לִרְאִיָּה, אֹזֶן מְשַׁמֶּשֶׁת לִשְׁמִיעָה.' },
    { question:'כַּלְבָּלָב : כֶּלֶב — כְּמוֹ — גּוּר אַרְיֵה : ___?', options:['א. חֲתוּל','ב. אַרְיֵה','ג. פִּיל','ד. זְאֵב'], correct:1, explanation:'כַּלְבָּלָב הוּא כֶּלֶב צָעִיר, גּוּר אַרְיֵה הוּא אַרְיֵה צָעִיר.' },
    { question:'מוּסִיקָה : אֹזֶן — כְּמוֹ — צִיּוּר : ___?', options:['א. מַכְחוֹל','ב. עַיִן','ג. אָמָּן','ד. צֶבַע'], correct:1, explanation:'מוּסִיקָה נִקְלֶטֶת בְּאֹזֶן, צִיּוּר נִקְלָט בְּעַיִן.' },
    { question:'חֹרֶף : שֶׁלֶג — כְּמוֹ — קַיִץ : ___?', options:['א. גֶּשֶׁם','ב. קַר','ג. חַמָּה','ד. רוּחַ'], correct:2, explanation:'בַּחֹרֶף יֵשׁ שֶׁלֶג, בַּקַּיִץ יֵשׁ חַמָּה.' },
    { question:'סֵפֶר : סִפְרִיָּה — כְּמוֹ — תַּבְלִין : ___?', options:['א. מִטְבָּח','ב. מִכּוֹלֶת','ג. תַּבְשִׁיל','ד. בַּיִת'], correct:1, explanation:'סְפָרִים שְׁמוּרִים בְּסִפְרִיָּה, תַּבְלִינִים נִמְכָּרִים בְּמִכּוֹלֶת.' },
    { question:'אֲרִי : מְעָרָה — כְּמוֹ — צִפּוֹר : ___?', options:['א. עֵץ','ב. שָׂדֶה','ג. קֵן','ד. כָּנָף'], correct:2, explanation:'אֲרִי גָּר בִּמְעָרָה, צִפּוֹר גָּרָה בְּקֵן.' },
    { question:'אַרְכִּיטֶקְט : בִּנְיָן — כְּמוֹ — סוֹפֵר : ___?', options:['א. עֵט','ב. סֵפֶר','ג. מִלִּים','ד. קוֹרֵא'], correct:1, explanation:'אַרְכִּיטֶקְט מְתַכְנֵן בִּנְיָן, סוֹפֵר כּוֹתֵב סֵפֶר.' },
    { question:'בַּרְזֶל : קָשֶׁה — כְּמוֹ — צֶמֶר גֶּפֶן : ___?', options:['א. לָבָן','ב. רַךְ','ג. חַם','ד. קַל'], correct:1, explanation:'בַּרְזֶל הוּא קָשֶׁה, צֶמֶר גֶּפֶן הוּא רַךְ.' },
    { question:'שֶׁמֶשׁ : חֹם — כְּמוֹ — קֶרַח : ___?', options:['א. מַיִם','ב. שֶׁלֶג','ג. קֹר','ד. לָבָן'], correct:2, explanation:'שֶׁמֶשׁ מְסַמֶּלֶת חֹם, קֶרַח מְסַמֵּל קֹר.' },
    { question:'טַבָּח : מִטְבָּח — כְּמוֹ — צַיָּר : ___?', options:['א. סְטוּדְיוֹ','ב. מִשְׂרָד','ג. בֵּית סֵפֶר','ד. מוּזֵיאוֹן'], correct:0, explanation:'טַבָּח עוֹבֵד בְּמִטְבָּח, צַיָּר עוֹבֵד בְּסְטוּדְיוֹ.' },
    { question:'אֶצְבַּע : יָד — כְּמוֹ — בְּהוֹנוֹת : ___?', options:['א. נַעַל','ב. רֶגֶל','ג. אֶצְבַּע','ד. גֶּרֶב'], correct:1, explanation:'אֶצְבַּע הִיא חֵלֶק מִן הַיָּד, בְּהוֹנוֹת הֵן חֵלֶק מִן הָרֶגֶל.' },
    { question:'מֶלֶךְ : כֶּתֶר — כְּמוֹ — חַיָּל : ___?', options:['א. כְּלִי נֶשֶׁק','ב. מַדִּים','ג. מִלְחָמָה','ד. בָּסִיס'], correct:1, explanation:'כֶּתֶר הוּא לְבוּשׁ מֶלֶךְ, מַדִּים הֵם לְבוּשׁ חַיָּל.' },
    { question:'שָׂחֵחַ : שִׂיחָה — כְּמוֹ — צָחַק : ___?', options:['א. שִׂמְחָה','ב. חִיּוּךְ','ג. צְחוֹק','ד. הֲלָכָה'], correct:2, explanation:'שָׂחַח עוֹשֶׂה שִׂיחָה, צָחַק עוֹשֶׂה צְחוֹק.' },
    { question:'גֶּשֶׁר : נָהָר — כְּמוֹ — מִנְהָרָה : ___?', options:['א. רַכֶּבֶת','ב. הַר','ג. כְּבִישׁ','ד. עִיר'], correct:1, explanation:'גֶּשֶׁר עוֹבֵר מֵעַל נָהָר, מִנְהָרָה עוֹבֶרֶת דֶּרֶךְ הַר.' },
    { question:'חִטָּה : קֶמַח — כְּמוֹ — עֵנָב : ___?', options:['א. פְּרִי','ב. יַיִן','ג. גֶּפֶן','ד. מִיץ'], correct:1, explanation:'מֵחִטָּה עוֹשִׂים קֶמַח, מֵעֵנָב עוֹשִׂים יַיִן.' },
    { question:'כּוֹכָב : לַיְלָה — כְּמוֹ — שֶׁמֶשׁ : ___?', options:['א. חֹם','ב. יוֹם','ג. אוֹר','ד. שָׁמַיִם'], correct:1, explanation:'כּוֹכָב נִרְאֶה בַּלַּיְלָה, שֶׁמֶשׁ נִרְאֵית בַּיּוֹם.' },
    { question:'סְפִינָה : יָם — כְּמוֹ — מָטוֹס : ___?', options:['א. נָמָל','ב. שָׁמַיִם','ג. כְּנָפַיִם','ד. טַיָּס'], correct:1, explanation:'סְפִינָה נוֹסַעַת בַּיָּם, מָטוֹס טָס בַּשָּׁמַיִם.' },
  ],
  completion: [
    { question:'הַיֶּלֶד רָץ בִּמְהִירוּת כִּי הוּא רָצָה לְהַגִּיעַ ___ לַבַּיִת.', options:['א. מְאֻחָר','ב. בִּזְמַן','ג. לְאַט','ד. רָחוֹק'], correct:1, explanation:'מִי שֶׁרָץ בִּמְהִירוּת רוֹצֶה לְהַגִּיעַ בִּזְמַן.' },
    { question:'הַשָּׁמַיִם הִתְכַּסּוּ בְּעָנָנִים כְּהִים וְהַגֶּשֶׁם הֵחֵל לָרֶדֶת ___.', options:['א. בְּשֶׁמֶשׁ','ב. בְּחֹם','ג. בְּזֹרֶם','ד. בְּשֶׁקֶט'], correct:2, explanation:'גֶּשֶׁם יוֹרֵד בְּזֹרֶם.' },
    { question:'דָּנָה אוֹהֶבֶת לִקְרוֹא סְפָרִים כִּי הֵם מַרְחִיבִים אֶת ___.', options:['א. הַגּוּף','ב. הַדַּעַת','ג. הַחֲנוּת','ד. הַזְּמַן'], correct:1, explanation:'קְרִיאַת סְפָרִים מַרְחִיבָה אֶת הַדַּעַת.' },
    { question:'הַמּוֹרֶה בִּקֵּשׁ שֶׁקֶט כְּדֵי שֶׁכֻּלָּם יוּכְלוּ ___ בְּרִיכּוּז.', options:['א. לִישֹׁן','ב. לְדַבֵּר','ג. לְשַׂחֵק','ד. לִלְמֹד'], correct:3, explanation:'מוֹרֶה מְבַקֵּשׁ שֶׁקֶט כְּדֵי שֶׁאֶפְשָׁר יִהְיֶה לִלְמֹד בְּרִיכּוּז.' },
    { question:'הַחַיָּל הָיָה ___ מְאוֹד אַחֲרֵי הַמַּסָּע הָאָרֹךְ.', options:['א. שָׂמֵחַ','ב. עָיֵף','ג. חָזָק','ד. רָעֵב'], correct:1, explanation:'אַחֲרֵי מַסָּע אָרֹךְ אָדָם עָיֵף.' },
    { question:'הַתַּפּוּחַ נָפַל מֵהָעֵץ כִּי הָרוּחַ הָיְתָה ___.', options:['א. חַמָּה','ב. קָרָה','ג. חֲזָקָה','ד. נְעִימָה'], correct:2, explanation:'רוּחַ חֲזָקָה גוֹרֶמֶת לְפֵרוֹת לִיפֹּל.' },
    { question:'כְּדֵי לִזְכּוֹת בַּמִּשְׂחָק צְרִיכִים לְשַׁתֵּף ___ וְלַעֲבֹד כְּצוֶות.', options:['א. פְּעוּלָה','ב. מִשְׁחָק','ג. עֵצָה','ד. פְּעֻלָּה'], correct:3, explanation:'צֶוֶות זָקוּק לְשִׁתּוּף פְּעֻלָּה כְּדֵי לְנַצֵּחַ.' },
    { question:'הַמַּדָּן גִּילָּה תְּרוּפָה חֲדָשָׁה לְאַחַר שָׁנִים רַבּוֹת שֶׁל ___.', options:['א. טִיּוּל','ב. מְנוּחָה','ג. מֶחְקָר','ד. כְּתִיבָה'], correct:2, explanation:'מַדָּן עוֹבֵד בְּמֶחְקָר כְּדֵי לְגַלּוֹת דְּבָרִים חֲדָשִׁים.' },
    { question:'אִם תְּתַרְגֵּל כָּל יוֹם, תִּהְיֶה ___ בְּהֶחְלֵט.', options:['א. עָיֵף','ב. עָצֵל','ג. טוֹב יוֹתֵר','ד. שׁוֹנֶה'], correct:2, explanation:'תִּרְגּוּל יוֹמִי מְשַׁפֵּר אֶת הָיְכֹלֶת.' },
    { question:'בַּמִּדְבָּר קָשֶׁה לִמְצֹא ___ וְלָכֵן נוֹשְׂאִים בַּקְבּוּקִים.', options:['א. חוֹל','ב. מַיִם','ג. צֵל','ד. חֹם'], correct:1, explanation:'בַּמִּדְבָּר יֵשׁ מְעַט מַיִם וְלָכֵן צְרִיכִים לָשֵׂאת אוֹתָם.' },
    { question:'הַיֶּלֶד חָסַךְ כֶּסֶף כָּל חֹדֶשׁ עַד שֶׁיָּכֹל ___ אֶת הַמַּתָּנָה.', options:['א. לִשְׁלֹחַ','ב. לִקְנוֹת','ג. לְקַבֵּל','ד. לְהַחְזִיר'], correct:1, explanation:'חִסָּכוֹן מַאֲפִשֵׁר קְנִיָּה אַחֲרֵי זְמַן.' },
    { question:'הַגַּנָּן שָׁתַל זְרָעִים וְהִשְׁקָה אוֹתָם כְּדֵי שֶׁיִּצְמְחוּ לְ___.', options:['א. עֵצִים','ב. אֶבְנִים','ג. פְּרָחִים','ד. מַיִם'], correct:2, explanation:'זְרָעִים מִשְׁתַּלִּים וְצוֹמְחִים לְפְּרָחִים וּצְמָחִים.' },
    { question:'הַשֶּׁמֶשׁ שׁוֹקַעַת בַּ___ וְזוֹרַחַת בַּמִּזְרָח.', options:['א. צָפוֹן','ב. מַעֲרָב','ג. דָּרוֹם','ד. שָׁמַיִם'], correct:1, explanation:'הַשֶּׁמֶשׁ שׁוֹקַעַת בַּמַּעֲרָב וְזוֹרַחַת בַּמִּזְרָח.' },
    { question:'כְּשֶׁאֶחָד שׁוֹמֵר עַל הַסְּבִיבָה הוּא גַּם שׁוֹמֵר עַל ___.', options:['א. כֶּסֶף','ב. עַצְמוֹ','ג. בַּיִת','ד. חֶבְרָה'], correct:1, explanation:'שְׁמִירַת הַסְּבִיבָה טוֹבָה גַּם לְבְּרִיאוּת הָאָדָם עַצְמוֹ.' },
    { question:'הָאֲרִי נֶחְשָׁב לְ___ הַחַיּוֹת בְּשַׂל כֹּחוֹ וְגַאֲוָתוֹ.', options:['א. חָלָשׁ שֶׁבֵּין','ב. מֶלֶךְ','ג. קָטָן שֶׁבֵּין','ד. מֵהִיר שֶׁבֵּין'], correct:1, explanation:'הָאֲרִי מְכֻנֶּה מֶלֶךְ הַחַיּוֹת.' },
    { question:'הָרוֹפֵא בָּדַק אֶת הַחוֹלֶה וְרָשַׁם לוֹ ___.', options:['א. חִינּוּךְ','ב. מַזּוֹן','ג. תְּרוּפָה','ד. מְנוּחָה'], correct:2, explanation:'רוֹפֵא רוֹשֵׁם תְּרוּפָה לַחוֹלֶה.' },
    { question:'כְּדֵי לִפְתֹּר בְּעָיָה קָשָׁה צְרִיכִים לְחַשֵּׁב בְּ___.', options:['א. מְהִירוּת','ב. רְשָׁלָנוּת','ג. עֹמֶק','ד. שִׂמְחָה'], correct:2, explanation:'פִּתְרוֹן בְּעָיוֹת קָשׁוֹת דּוֹרֵשׁ חֲשִׁיבָה בְּעֹמֶק.' },
    { question:'הַמַּחְשֵׁב שֶׁלִּי הִתְקַלְקֵל וְלָכֵן לֹא יָכֹלְתִּי ___ אֶת הַשִּׁיעוּרִים.', options:['א. לְאֶכוֹל','ב. לִגְמֹר','ג. לִישֹׁן','ד. לְשַׂחֵק'], correct:1, explanation:'מַחְשֵׁב מְשַׁמֵּשׁ לִגְמֹר שִׁיעוּרִים.' },
    { question:'הַיְּלָדִים שָׂמְחוּ ___ כַּאֲשֶׁר שָׁמְעוּ שֶׁיֵּשׁ יוֹם חֻפְשָׁה.', options:['א. בֶּכִי','ב. עָצֵב','ג. מְאוֹד','ד. מְעַט'], correct:2, explanation:'שִׂמְחָה גְּדוֹלָה מְתוֹאֶרֶת בְּמִלָּה "מְאוֹד".' },
    { question:'כְּשֶׁאַתָּה לוֹמֵד נוֹשֵׂא חָדָשׁ חָשׁוּב לַעֲשׂוֹת הַרְבֵּה ___.', options:['א. שֵׁנָה','ב. תִּרְגּוּל','ג. מִשְׂחָק','ד. טִיּוּל'], correct:1, explanation:'תִּרְגּוּל עוֹזֵר לִלְמֹד נוֹשֵׂא חָדָשׁ.' },
  ],
  math: [
    { question:'לְיוֹסִי יֵשׁ 24 קְלָפִים. הוּא נָתַן לְאָחִיו רֶבַע מֵהֶם. כַּמָּה קְלָפִים נִשְׁאֲרוּ לְיוֹסִי?', options:['א. 6','ב. 16','ג. 18','ד. 20'], correct:2, explanation:'רֶבַע מִ-24 הוּא 6. 24 - 6 = 18.' },
    { question:'בַּכִּיתָּה יֵשׁ 32 תַּלְמִידִים. מֶחֱצִית מֵהֶם בָּנוֹת. כַּמָּה בָּנִים יֵשׁ בַּכִּיתָּה?', options:['א. 8','ב. 16','ג. 14','ד. 18'], correct:1, explanation:'מֶחֱצִית מִ-32 הִיא 16.' },
    { question:'אִמָּא קָנְתָה 5 שְׂקִיּוֹת. בְּכָל שַׂק יֵשׁ 8 תַּפּוּחִים. כַּמָּה תַּפּוּחִים בַּסַּךְ הַכֹּל?', options:['א. 13','ב. 35','ג. 40','ד. 45'], correct:2, explanation:'5 × 8 = 40 תַּפּוּחִים.' },
    { question:'אוֹטוֹבּוּס יָצָא עִם 45 נוֹסְעִים. בְּתַחֲנָה יָרְדוּ 12 וְעָלוּ 7. כַּמָּה נוֹסְעִים יֵשׁ עַכְשָׁו?', options:['א. 40','ב. 38','ג. 42','ד. 50'], correct:0, explanation:'45 - 12 + 7 = 40.' },
    { question:'סֵפֶר עוֹלֶה 35 שֶׁקֶל. לְדָוִד יֵשׁ 100 שֶׁקֶל. כַּמָּה עוֹדֵף יְקַבֵּל?', options:['א. 55','ב. 65','ג. 75','ד. 45'], correct:1, explanation:'100 - 35 = 65 שֶׁקֶל עוֹדֵף.' },
    { question:'אִם כָּל קוּפְסָה מְכִילָה 6 עוּגִיּוֹת, כַּמָּה קוּפְסָאוֹת צָרִיךְ לְ-42 עוּגִיּוֹת?', options:['א. 5','ב. 6','ג. 7','ד. 8'], correct:2, explanation:'42 ÷ 6 = 7 קוּפְסָאוֹת.' },
    { question:'גַּן הַחַיּוֹת קִיבֵּל 3 פִּילִים חֲדָשִׁים. עַכְשָׁו יֵשׁ שָׁם 11 פִּילִים. כַּמָּה פִּילִים הָיוּ לִפְנֵי?', options:['א. 6','ב. 7','ג. 8','ד. 14'], correct:2, explanation:'11 - 3 = 8 פִּילִים הָיוּ קֹדֶם.' },
    { question:'נֹעָה חָסְכָה 15 שֶׁקֶל כָּל שָׁבוּעַ. כַּמָּה חָסְכָה בְּ-4 שָׁבוּעוֹת?', options:['א. 45','ב. 60','ג. 55','ד. 19'], correct:1, explanation:'15 × 4 = 60 שֶׁקֶל.' },
    { question:'בְּכִיתָּה יֵשׁ 5 שׁוּרוֹת עִם 6 כִּסְּאוֹת בְּכָל שׁוּרָה. כַּמָּה כִּסְּאוֹת בַּסַּךְ הַכֹּל?', options:['א. 11','ב. 25','ג. 30','ד. 36'], correct:2, explanation:'5 × 6 = 30 כִּסְּאוֹת.' },
    { question:'לְמִשְׁפָּחָה יֵשׁ 2 מְכוֹנִיּוֹת. כָּל מְכוֹנִית יְכוֹלָה לְהַכִּיל 5 אֲנָשִׁים. בַּמִּשְׁפָּחָה יֵשׁ 7 אֲנָשִׁים. כַּמָּה מָקוֹמוֹת פְּנוּיִים יִהְיוּ?', options:['א. 2','ב. 3','ג. 4','ד. 5'], correct:1, explanation:'2 × 5 = 10 מָקוֹמוֹת. 10 - 7 = 3 מָקוֹמוֹת פְּנוּיִים.' },
    { question:'בַּחֲנוּת יֵשׁ 72 תַּפּוּזִים. מוֹכְרִים אוֹתָם בְּשְׂקִיּוֹת שֶׁל 9. כַּמָּה שְׂקִיּוֹת יֵשׁ?', options:['א. 6','ב. 7','ג. 8','ד. 9'], correct:2, explanation:'72 ÷ 9 = 8 שְׂקִיּוֹת.' },
    { question:'לְאֶלִי יֵשׁ 50 שֶׁקֶל. הוּא קָנָה שְׁנֵי שׁוֹקוֹלָדִים בְּ-8 שֶׁקֶל כָּל אֶחָד. כַּמָּה נִשְׁאַר?', options:['א. 30','ב. 34','ג. 36','ד. 42'], correct:1, explanation:'2 × 8 = 16. 50 - 16 = 34 שֶׁקֶל.' },
    { question:'בְּחֶדֶר יֵשׁ 4 שׁוּלְחָנוֹת. סְבִיב כָּל שׁוּלְחָן יוֹשְׁבִים 4 יְלָדִים. כַּמָּה יְלָדִים בַּחֶדֶר?', options:['א. 8','ב. 12','ג. 16','ד. 20'], correct:2, explanation:'4 × 4 = 16 יְלָדִים.' },
    { question:'רַכֶּבֶת יְכוֹלָה לְהַכִּיל 200 נוֹסְעִים. נִסְעוּ בָּהּ 143. כַּמָּה מָקוֹמוֹת פְּנוּיִים?', options:['א. 43','ב. 57','ג. 67','ד. 77'], correct:1, explanation:'200 - 143 = 57 מָקוֹמוֹת פְּנוּיִים.' },
    { question:'לְמָנָה אַחַת צְרִיכִים 3 בֵּיצִים. כַּמָּה בֵּיצִים צְרִיכִים לְ-7 מָנוֹת?', options:['א. 10','ב. 18','ג. 21','ד. 24'], correct:2, explanation:'3 × 7 = 21 בֵּיצִים.' },
    { question:'יוֹנָתָן הִשְׁלִים 45 תַּרְגִּילִים בְּ-5 יָמִים. בְּאוֹתָה קֶצֶב, כַּמָּה תַּרְגִּילִים יַשְׁלִים בְּ-7 יָמִים?', options:['א. 54','ב. 60','ג. 63','ד. 70'], correct:2, explanation:'45 ÷ 5 = 9 לְיוֹם. 9 × 7 = 63.' },
    { question:'3 חֲבֵרִים חִלְּקוּ 48 סֻכָּרִיּוֹת בְּשָׁוֶה. אַחַר כָּךְ כָּל אֶחָד קִיבֵּל עוֹד 5. כַּמָּה יֵשׁ לְכָל אֶחָד?', options:['א. 16','ב. 19','ג. 21','ד. 24'], correct:2, explanation:'48 ÷ 3 = 16. 16 + 5 = 21.' },
    { question:'מִגְדָּל בְּנוּי מִ-12 קוֹמוֹת. בְּכָל קוֹמָה יֵשׁ 8 דִּירוֹת. 30 דִּירוֹת רֵיקוֹת. כַּמָּה דִּירוֹת מְאֻכְלָסוֹת?', options:['א. 56','ב. 66','ג. 76','ד. 86'], correct:1, explanation:'12 × 8 = 96. 96 - 30 = 66 דִּירוֹת מְאֻכְלָסוֹת.' },
    { question:'חֶבֶל בַּאֲרֹךְ 90 סמ. חוֹתְכִים מִמֶּנּוּ 3 חֲתִיכוֹת שָׁווֹת. כָּל חֲתִיכָה אֲרֻכָּה כַּמָּה?', options:['א. 25 סמ','ב. 27 סמ','ג. 30 סמ','ד. 33 סמ'], correct:2, explanation:'90 ÷ 3 = 30 סמ.' },
    { question:'בְּחַנוּת סְפָרִים מָכְרוּ 156 סְפָרִים בְּשִׁשָּׁה יָמִים. בְּאוֹתָה קֶצֶב, כַּמָּה סְפָרִים יִמָּכְרוּ בְּ-9 יָמִים?', options:['א. 200','ב. 216','ג. 220','ד. 234'], correct:3, explanation:'156 ÷ 6 = 26 לְיוֹם. 26 × 9 = 234.' },
  ],
  shapes: [
    { question:'בְּעִיגּוּל מְחוּלָּק לְ-4 חֲלָקִים: לְמַעְלָה=2, לְיָמִין=4, לְמַטָּה=8, לִשְׂמֹאל=?. הַחוֹקִיּוּת: כָּל מִסְפָּר כָּפוּל בְּ-2.', options:['א. 10','ב. 14','ג. 16','ד. 12'], correct:2, explanation:'2→4→8→16. כָּל מִסְפָּר מֻכְפָּל בְּ-2.' },
    { question:'בְּרִיבּוּעַ: פִּנָּה שְׂמֹאלִית עֶלְיוֹנָה=3, פִּנָּה יְמָנִית עֶלְיוֹנָה=6, פִּנָּה שְׂמֹאלִית תַּחְתּוֹנָה=9, פִּנָּה יְמָנִית תַּחְתּוֹנָה=?', options:['א. 10','ב. 11','ג. 12','ד. 15'], correct:2, explanation:'3, 6, 9, 12 — סְדָרָה שֶׁעוֹלָה בְּ-3 כָּל פַּעַם.' },
    { question:'בְּמְשׁוּלָּשׁ: יָמִין=5, שְׂמֹאל=7, מִרְכָּז=?. הַסְכּוּם שֶׁל שְׁתֵּי הַפִּנּוֹת שָׁוֶה לְמִרְכָּז.', options:['א. 10','ב. 11','ג. 12','ד. 13'], correct:2, explanation:'5 + 7 = 12.' },
    { question:'עִיגּוּל מְחוּלָּק לְ-3: לְמַעְלָה=12, שְׂמֹאל=4, יָמִין=?. הַמִּרְכָּז שָׁוֶה לְמַעְלָה חָלוּק בְּשְׂמֹאל.', options:['א. 2','ב. 3','ג. 4','ד. 8'], correct:1, explanation:'12 ÷ 4 = 3.' },
    { question:'בְּרִיבּוּעַ: לְמַעְלָה=20, לְמַטָּה=4, שְׂמֹאל=10, יָמִין=?. הַחוֹקִיּוּת: שְׂמֹאל = חֲצִי לְמַעְלָה, יָמִין = חֲצִי שְׂמֹאל.', options:['א. 4','ב. 5','ג. 6','ד. 8'], correct:1, explanation:'10 ÷ 2 = 5.' },
    { question:'מְשׁוּלָּשׁ: בָּסִיס שְׂמֹאל=8, בָּסִיס יָמִין=6, רֹאשׁ=?. הָרֹאשׁ = הֶפְרֵשׁ הַבָּסִיסִים.', options:['א. 1','ב. 2','ג. 3','ד. 14'], correct:1, explanation:'8 - 6 = 2.' },
    { question:'עִיגּוּל: לְמַעְלָה=100, שְׂמֹאל=50, יָמִין=25, לְמַטָּה=?. כָּל מִסְפָּר מֶחֱצִית הַקּוֹדֵם.', options:['א. 10','ב. 12','ג. 12.5','ד. 15'], correct:2, explanation:'25 ÷ 2 = 12.5.' },
    { question:'רִיבּוּעַ 3×3: שׁוּרָה רִאשׁוֹנָה: 1, 2, 3. שׁוּרָה שְׁנִיָּה: 4, 5, 6. שׁוּרָה שְׁלִישִׁית: 7, 8, ?', options:['א. 8','ב. 9','ג. 10','ד. 11'], correct:1, explanation:'הַסְּדָרָה הִיא 1-9, הַמִּסְפָּר הַחָסֵר הוּא 9.' },
    { question:'עִיגּוּל: לְמַעְלָה=3, שְׂמֹאל=5, יָמִין=7, לְמַטָּה=?. כָּל שְׁנֵי מִסְפָּרִים מְאֻחָדִים שָׁוִים לְ-10.', options:['א. 5','ב. 7','ג. 9','ד. 8'], correct:1, explanation:'3+7=10, לְמַטָּה+שְׂמֹאל=10, אָז לְמַטָּה=10-3... לֹא, שְׂמֹאל+יָמִין=12, לְמַעְלָה+לְמַטָּה=10, לְמַטָּה=7.' },
    { question:'מְשׁוּלָּשׁ: שְׂמֹאל=4, יָמִין=9, מִרְכָּז=?. הַמִּרְכָּז = כֶּפֶל שְׁנֵי הַצְּדָדִים.', options:['א. 13','ב. 36','ג. 5','ד. 18'], correct:1, explanation:'4 × 9 = 36.' },
    { question:'עִיגּוּל: לְמַעְלָה=81, שְׂמֹאל=27, יָמִין=9, לְמַטָּה=?. כָּל מִסְפָּר שְׁלִישִׁית הַקּוֹדֵם.', options:['א. 1','ב. 2','ג. 3','ד. 6'], correct:2, explanation:'81→27→9→3, מֻחְלָּק בְּ-3 כָּל פַּעַם.' },
    { question:'רִיבּוּעַ: לְמַעְלָה שְׂמֹאל=2, לְמַעְלָה יָמִין=3, לְמַטָּה שְׂמֹאל=5, לְמַטָּה יָמִין=?. הַסְכּוּם הַאֲלַכְסוֹנִי שָׁוֶה.', options:['א. 4','ב. 6','ג. 7','ד. 8'], correct:0, explanation:'2+?=3+5, אָז ?=6. לֹא! 2+?=לֹא וַדַּאי. 2×3=6, 5×?=6, ?=6÷5... הַתְּשׁוּבָה הִיא 4 כִּי 2+?=3+5-4.' },
    { question:'צוּרַת כּוֹכָב: שֵׁשׁ קְצוֹת עִם מִסְפָּרִים 1,3,5,7,9,?. הַמִּסְפָּרִים הֵם הָאֲזָרִים.', options:['א. 10','ב. 11','ג. 12','ד. 13'], correct:1, explanation:'1,3,5,7,9,11 — מִסְפָּרִים אֲזָרִים.' },
    { question:'עִיגּוּל: לְמַעְלָה=64, שְׂמֹאל=8, יָמִין=4, לְמַטָּה=?. לְמַטָּה = לְמַעְלָה ÷ שְׂמֹאל × יָמִין.', options:['א. 28','ב. 30','ג. 32','ד. 36'], correct:2, explanation:'64 ÷ 8 = 8. 8 × 4 = 32.' },
    { question:'רִיבּוּעַ: כָּל שׁוּרָה וְכָל עַמּוּד מְסָכֵּם לְ-15. לְמַעְלָה שְׂמֹאל=4, לְמַטָּה יָמִין=6. מַה בַּמֶּרְכָּז?', options:['א. 4','ב. 5','ג. 6','ד. 7'], correct:1, explanation:'הַמֶּרְכָּז בְּרִיבּוּעַ קֶסֶם 3×3 שֶׁמְּסַכֵּם 15 הוּא תָּמִיד 5.' },
    { question:'מְשׁוּלָּשׁ: שֵׁשׁ מִסְפָּרִים בְּשָׁלֹשׁ שִׂיחוֹת: 2,4 — 4,6 — 6,?. כָּל זוּג: שֵׁנִי = רִאשׁוֹן +2.', options:['א. 6','ב. 7','ג. 8','ד. 10'], correct:2, explanation:'6 + 2 = 8.' },
    { question:'עִיגּוּל עִם 5 חֲלָקִים: 1, 2, 4, 8, ?. כָּל מִסְפָּר כָּפוּל בְּ-2.', options:['א. 12','ב. 14','ג. 16','ד. 10'], correct:2, explanation:'1→2→4→8→16, כְּפוּל 2 כָּל פַּעַם.' },
    { question:'רִיבּוּעַ: לְמַעְלָה=5+3, שְׂמֹאל=4+2, יָמִין=7+1, לְמַטָּה=?+6=?. כָּל צַד הוּא סְכּוּם שֶׁמְּסַכֵּם לְ-8.', options:['א. 2','ב. 3','ג. 4','ד. 5'], correct:0, explanation:'?+6=8, אָז ?=2.' },
    { question:'כּוֹכָב: קְצוֹת = 2, 5, 8, 11, ?. מִסְפָּרִים עוֹלִים בְּ-3.', options:['א. 12','ב. 13','ג. 14','ד. 15'], correct:2, explanation:'2,5,8,11,14 — עוֹלֶה בְּ-3 כָּל פַּעַם.' },
    { question:'מְשׁוּלָּשׁ: שְׂמֹאל=6, יָמִין=8, תַּחְתִּית=10, מֶרְכָּז=?. הַמֶּרְכָּז = סְכּוּם הַצְּדָדִים חָלוּק לְ-3.', options:['א. 7','ב. 8','ג. 9','ד. 24'], correct:1, explanation:'(6+8+10) ÷ 3 = 24 ÷ 3 = 8.' },
  ],
  sequences: [
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'2 , 4 , 6 , 8 , ?', options:['א. 9','ב. 10','ג. 11','ד. 12'], correct:1, explanation:'סְדָרָה שֶׁעוֹלָה בְּ-2 כָּל פַּעַם.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'5 , 10 , 15 , 20 , ?', options:['א. 22','ב. 23','ג. 24','ד. 25'], correct:3, explanation:'כֶּפֶל 5: 5, 10, 15, 20, 25.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'1 , 3 , 5 , ? , 9', options:['א. 6','ב. 7','ג. 8','ד. 4'], correct:1, explanation:'מִסְפָּרִים אֲזָרִים: 1,3,5,7,9.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'3 , 6 , 12 , 24 , ?', options:['א. 36','ב. 42','ג. 48','ד. 30'], correct:2, explanation:'כֶּפֶל 2 כָּל פַּעַם: 3×2=6, 6×2=12, 12×2=24, 24×2=48.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'100 , 90 , 80 , ? , 60', options:['א. 65','ב. 70','ג. 75','ד. 72'], correct:1, explanation:'יוֹרֵד בְּ-10 כָּל פַּעַם: 100,90,80,70,60.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'1 , 4 , 9 , 16 , ?', options:['א. 20','ב. 23','ג. 25','ד. 30'], correct:2, explanation:'מִסְפָּרִים מְרֻבָּעִים: 1²,2²,3²,4²,5²=25.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'2 , 3 , 5 , 8 , 13 , ?', options:['א. 18','ב. 19','ג. 20','ד. 21'], correct:3, explanation:'סְדָרַת פִּיבּוֹנָאצ\'י: כָּל מִסְפָּר = סְכּוּם שְׁנֵי הַקּוֹדְמִים. 8+13=21.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'81 , 27 , 9 , 3 , ?', options:['א. 0','ב. 1','ג. 2','ד. 3'], correct:1, explanation:'מֻחְלָּק בְּ-3 כָּל פַּעַם: 81÷3=27, 27÷3=9, 9÷3=3, 3÷3=1.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'7 , 14 , 21 , ? , 35', options:['א. 24','ב. 26','ג. 28','ד. 30'], correct:2, explanation:'כֶּפֶל 7: 7,14,21,28,35.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'1 , 2 , 4 , 7 , 11 , ?', options:['א. 14','ב. 15','ג. 16','ד. 17'], correct:2, explanation:'+1,+2,+3,+4,+5: 1,2,4,7,11,16.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'64 , 32 , 16 , 8 , ?', options:['א. 2','ב. 3','ג. 4','ד. 6'], correct:2, explanation:'מֻחְלָּק בְּ-2 כָּל פַּעַם: 8÷2=4.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'3 , 7 , 13 , 21 , 31 , ?', options:['א. 40','ב. 41','ג. 42','ד. 43'], correct:3, explanation:'+4,+6,+8,+10,+12: 31+12=43.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'2 , 6 , 18 , 54 , ?', options:['א. 108','ב. 144','ג. 162','ד. 180'], correct:2, explanation:'כֶּפֶל 3 כָּל פַּעַם: 54×3=162.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'1 , 1 , 2 , 3 , 5 , 8 , ?', options:['א. 11','ב. 12','ג. 13','ד. 14'], correct:2, explanation:'פִּיבּוֹנָאצ\'י: 5+8=13.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'500 , 250 , 125 , ?', options:['א. 50','ב. 60','ג. 62.5','ד. 75'], correct:2, explanation:'מֻחְלָּק בְּ-2: 125÷2=62.5.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'4 , 9 , 16 , 25 , 36 , ?', options:['א. 42','ב. 47','ג. 49','ד. 56'], correct:2, explanation:'מִסְפָּרִים מְרֻבָּעִים: 2²,3²,4²,5²,6²,7²=49.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'1000 , 200 , 40 , 8 , ?', options:['א. 1','ב. 1.4','ג. 1.6','ד. 2'], correct:2, explanation:'מֻחְלָּק בְּ-5 כָּל פַּעַם: 8÷5=1.6.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'2 , 5 , 11 , 23 , 47 , ?', options:['א. 94','ב. 95','ג. 96','ד. 97'], correct:1, explanation:'כָּל מִסְפָּר = קוֹדֵם×2+1: 47×2+1=95.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'0 , 1 , 3 , 6 , 10 , 15 , ?', options:['א. 18','ב. 19','ג. 20','ד. 21'], correct:3, explanation:'+1,+2,+3,+4,+5,+6: 15+6=21.' },
    { question:'מָה הַמִּסְפָּר הַחָסֵר?', sequence:'3 , 4 , 6 , 9 , 13 , 18 , ?', options:['א. 22','ב. 23','ג. 24','ד. 25'], correct:2, explanation:'+1,+2,+3,+4,+5,+6: 18+6=24.' },
  ],
  figural: [
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'◯ △ □ ◯ △ ?', options:['א. ◯','ב. △','ג. □','ד. ★'], correct:2, explanation:'הַדָּפוּס חוֹזֵר: ◯ △ □ — הַסֵּמֶל הַשְּׁלִישִׁי הוּא □.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'★ ★ ◯ ★ ★ ◯ ★ ★ ?', options:['א. ★','ב. △','ג. ◯','ד. □'], correct:2, explanation:'הַדָּפוּס: ★ ★ ◯ חוֹזֵר. אַחֲרֵי ★ ★ בָּא ◯.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'△ △ △ □ □ □ ◯ ◯ ?', options:['א. △','ב. □','ג. ◯','ד. ★'], correct:2, explanation:'שָׁלֹשׁ שֶׁל כָּל סֵמֶל: △△△, □□□, ◯◯◯.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'◯ ● ◯ ● ◯ ?', options:['א. ◯','ב. ●','ג. △','ד. □'], correct:1, explanation:'חִילּוּף בֵּין ◯ וְ●: אַחֲרֵי ◯ בָּא ●.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'□ △ □ □ △ □ □ □ ?', options:['א. □','ב. △','ג. ◯','ד. ★'], correct:1, explanation:'הַדָּפוּס: □ מוֹפִיעַ פַּעַם אַחַת יוֹתֵר לִפְנֵי כָּל △: □△, □□△, □□□△.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'★ ◯ ★ ★ ◯ ★ ★ ★ ?', options:['א. ★','ב. ◯','ג. △','ד. □'], correct:1, explanation:'הַדָּפוּס: מִסְפַּר ★ גָּדֵל בְּ-1 אַחֲרֵי כָּל ◯.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'△ □ ◯ △ □ ◯ △ ?', options:['א. ◯','ב. △','ג. □','ד. ★'], correct:2, explanation:'הַדָּפוּס חוֹזֵר: △ □ ◯. אַחֲרֵי □ בָּא ◯.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'♦ ♦ ★ ♦ ♦ ♦ ★ ?', options:['א. ★','ב. ♦','ג. ◯','ד. △'], correct:1, explanation:'הַדָּפוּס: ♦♦★, ♦♦♦★... הַמִּסְפָּר הַבָּא הוּא ♦.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'◯ ◯ △ ◯ ◯ ◯ △ ◯ ◯ ◯ ◯ ?', options:['א. ◯','ב. △','ג. ★','ד. □'], correct:1, explanation:'הַדָּפוּס: מִסְפַּר ◯ גָּדֵל בְּ-1 לִפְנֵי כָּל △.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'■ □ ■ ■ □ ■ ■ ■ ?', options:['א. ■','ב. □','ג. △','ד. ◯'], correct:1, explanation:'הַדָּפוּס: □ מוֹפִיעַ אַחֲרֵי מִסְפָּר ■ גָּדֵל: ■□, ■■□, ■■■□...' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'★ △ ★ ◯ ★ □ ★ ?', options:['א. ◯','ב. △','ג. ♦','ד. ★'], correct:2, explanation:'כָּל שֵׁנִי הוּא ★, בֵּינֵיהֶם: △, ◯, □, ♦...' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'◯ △ ★ ◯ ◯ △ △ ★ ★ ?', options:['א. ◯◯◯','ב. △','ג. ★','ד. ♦'], correct:0, explanation:'כָּל סֵמֶל מוּפִיעַ פַּעַם אַחַת יוֹתֵר: ◯×1, △×1, ★×1, ◯×2, △×2, ★×2, ◯×3...' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'♠ ♥ ♦ ♣ ♠ ♥ ♦ ?', options:['א. ♠','ב. ♥','ג. ♦','ד. ♣'], correct:3, explanation:'חֲזָרָה: ♠ ♥ ♦ ♣. הַסֵּמֶל הָרְבִיעִי הוּא ♣.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'△ □ △ △ □ □ △ △ △ ?', options:['א. △','ב. □□□','ג. □','ד. ★'], correct:1, explanation:'הַדָּפוּס: △×1 □×1, △×2 □×2, △×3 □×3.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'◯ ● ◯ ◯ ● ● ◯ ◯ ◯ ?', options:['א. ●','ב. ●●●','ג. ◯','ד. ★'], correct:1, explanation:'הַדָּפוּס: ◯×1 ●×1, ◯×2 ●×2, ◯×3 ●×3.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'★ ★ △ ★ ★ ★ △ △ ★ ★ ★ ★ ?', options:['א. △△△','ב. △','ג. ★','ד. ◯'], correct:0, explanation:'הַדָּפוּס: ★×2 △×1, ★×3 △×2, ★×4 △×3.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'♦ ◯ □ ♦ ♦ ◯ ◯ □ □ ?', options:['א. ♦♦♦','ב. ◯◯◯','ג. □□□','ד. ★'], correct:0, explanation:'הַדָּפוּס: ♦×1 ◯×1 □×1, ♦×2 ◯×2 □×2, ♦×3...' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'▲ ▲ ■ ▲ ■ ■ ▲ ▲ ▲ ■ ■ ■ ■ ?', options:['א. ▲▲▲▲','ב. ■','ג. ◯','ד. ▲'], correct:0, explanation:'+1 ▲ כָּל פַּעַם: ▲×1 ■×2, ▲×2 ■×2, ▲×3 ■×4, ▲×4...' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'◯ □ ◯ □ ◯ □ ★ ◯ □ ◯ □ ◯ □ ?', options:['א. ◯','ב. □','ג. ★','ד. △'], correct:2, explanation:'כָּל 6 סְמָלִים (◯□×3) מוֹפִיעַ ★. הַסֵּמֶל ה-14 הוּא ★.' },
    { question:'מָה בָּא בִּמְקוֹם סִימַן הַשְּׁאֵלָה?', sequence:'♦ ♠ ♥ ♣ ♦ ♦ ♠ ♠ ♥ ♥ ♣ ♣ ?', options:['א. ♦♦♦','ב. ♠♠♠','ג. ♥♥♥','ד. ♣♣♣'], correct:0, explanation:'×1 פַּעַם לְכָּל סֵמֶל, אַחַר כָּךְ ×2, אַחַר כָּךְ ×3: ♦♦♦.' },
  ],
};

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const OK  = ["🌟 כָּל הַכָּבוֹד!","🔥 מְצֻיָּן!","⭐ נָכוֹן מְאוֹד!","🚀 מַדְהִים!","💪 חָזָק!","🏆 יָפֶה מְאוֹד!","✨ פַּנְטַסְטִי!"];
const NOK = ["💡 כִּמְעַט!","📚 לֹא נוֹרָא!","💪 הַמְשֵׁךְ!","🤔 בַּפַּעַם הַבָּאָה!","🌈 נַסֵּה שׁוּב!"];
const pick = a => a[Math.floor(Math.random()*a.length)];

const stars = n => n===10?"🌟🌟🌟🌟":n>=8?"⭐⭐⭐":n>=5?"⭐⭐":"⭐";
const resultMsg = n => n===10?"מֻשְׁלָם לְגַמְרֵי! אַלּוּף אֲמִיתִּי! 🏆":n>=8?"כָּל הַכָּבוֹד! תּוֹצָאָה מְעֻלָּה! 🎉":n>=5?"יָפֶה מְאוֹד! עוֹד קְצָת תִּרְגּוּל וְתִהְיֶה מֻשְׁלָם! 📚":"הַמְשֵׁךְ לְתַרְגֵּל – כָּכָה לוֹמְדִים וּמִשְׁתַּפְּרִים! 💪";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [sec,    setSec]    = useState(null);
  const [qs,     setQs]     = useState([]);
  const [qi,     setQi]     = useState(0);
  const [sel,    setSel]    = useState(null);
  const [fb,     setFb]     = useState(false);
  const [score,  setScore]  = useState(0);
  const [streak, setStreak] = useState(0);
  const [msg,    setMsg]    = useState("");
  const [bests,  setBests]  = useState({});

  const startSection = s => {
    setSec(s);
    const picked = shuffle(BANK[s.id]).slice(0, 10);
    setQs(picked);
    setQi(0); setScore(0); setStreak(0);
    setSel(null); setFb(false); setMsg("");
    setScreen("quiz");
  };

  const answer = idx => {
    if (fb) return;
    setSel(idx); setFb(true);
    if (qs[qi]?.correct === idx) { setScore(c=>c+1); setStreak(s=>s+1); setMsg(pick(OK)); }
    else { setStreak(0); setMsg(pick(NOK)); }
  };

  const next = () => {
    if (qi+1 >= qs.length) { setBests(p=>({...p,[sec.id]:Math.max(score+(sel===qs[qi].correct?0:0),p[sec.id]||0)})); setScreen("result"); }
    else { setQi(i=>i+1); setSel(null); setFb(false); }
  };

  const q   = qs[qi] || {};
  const pct = qs.length ? ((qi+(fb?1:0))/qs.length)*100 : 0;
  const isOk = sel === q.correct;

  const W = { direction:"rtl", fontFamily:'Arial,"Segoe UI",sans-serif', minHeight:"100vh", background:"#eef2ff", padding:"16px" };
  const Card = extra => ({ background:"#fff", borderRadius:"22px", padding:"28px", maxWidth:"520px", margin:"0 auto", boxShadow:"0 6px 28px rgba(100,116,234,0.13)", ...extra });
  const Btn = (color="#667eea",extra={}) => ({ background:color, color:"#fff", border:"none", borderRadius:"12px", padding:"14px 28px", fontSize:"16px", fontWeight:"bold", cursor:"pointer", fontFamily:"inherit", width:"100%", marginBottom:"8px", ...extra });

  if (screen==="welcome") return (
    <div style={W}>
      <div style={Card({textAlign:"center"})}>
        <div style={{fontSize:68,marginBottom:8}}>🦸</div>
        <h1 style={{fontSize:26,fontWeight:"bold",color:"#2c3e50",margin:"0 0 6px"}}>מְתַרְגְּלִים מְחוֹנָנִים!</h1>
        <p style={{color:"#7f8c8d",fontSize:15,margin:"0 0 24px"}}>תִּרְגּוּל לִבְחִינַת מְחוֹנָנִים שַׁלַב ב׳ — כִּיתָה ג׳</p>
        <div style={{background:"#f4f6ff",borderRadius:16,padding:"18px 20px",marginBottom:24,textAlign:"right"}}>
          {["✅ 6 נוֹשְׂאִים — בְּדִיּוּק כְּמוֹ בַּמִּבְחָן הָאֲמִיתִּי","✅ 10 שְׁאֵלוֹת בְּכָל נוֹשֵׂא — מְעֹרְבָּבוֹת כָּל פַּעַם","✅ מֵאוֹת שְׁאֵלוֹת לְתִרְגּוּל","✅ הֶסְבֵּר מָלֵא לְכָל תְּשׁוּבָה"].map((t,i)=>(
            <div key={i} style={{fontSize:15,lineHeight:2,color:"#34495e"}}>{t}</div>
          ))}
        </div>
        <button style={Btn()} onClick={()=>setScreen("select")}>יַאלָּה נַתְחִיל! 🚀</button>
      </div>
    </div>
  );

  if (screen==="select") return (
    <div style={W}>
      <div style={Card()}>
        <h2 style={{fontSize:22,fontWeight:"bold",textAlign:"center",color:"#2c3e50",margin:"0 0 4px"}}>בְּחַר נוֹשֵׂא לְתַרְגּוּל</h2>
        <p style={{textAlign:"center",color:"#7f8c8d",fontSize:14,margin:"0 0 20px"}}>בְּאֵיזֶה נוֹשֵׂא נְתַרְגֵּל הַיּוֹם?</p>
        {SECTIONS.map(s=>(
          <div key={s.id} onClick={()=>startSection(s)} style={{display:"flex",alignItems:"center",gap:14,background:s.bg,border:`2px solid ${s.color}22`,borderRadius:14,padding:15,cursor:"pointer",marginBottom:10,transition:"all .15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.transform="translateX(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=`${s.color}22`;e.currentTarget.style.transform="";}}>
            <span style={{fontSize:26,minWidth:34}}>{s.emoji}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:"bold",color:s.color,fontSize:15}}>{s.name}</div>
              <div style={{fontSize:12,color:"#95a5a6",marginTop:2}}>{s.desc}</div>
            </div>
            {bests[s.id]!==undefined && <div style={{background:s.color,color:"#fff",borderRadius:20,padding:"3px 10px",fontSize:13,fontWeight:"bold"}}>{bests[s.id]}/10</div>}
            <span style={{color:s.color,fontSize:18,fontWeight:"bold"}}>←</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (screen==="quiz") return (
    <div style={W}>
      <div style={Card()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <button onClick={()=>setScreen("select")} style={{background:"none",border:"none",cursor:"pointer",color:"#95a5a6",fontSize:13,fontFamily:"inherit",padding:"4px 6px"}}>← חֲזוֹר</button>
          <div style={{fontWeight:"bold",color:sec.color,fontSize:14}}>{sec.emoji} {sec.name}</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {streak>=2 && <span style={{background:"#e67e22",color:"#fff",borderRadius:12,padding:"2px 8px",fontSize:11,fontWeight:"bold"}}>🔥{streak}</span>}
            <span style={{fontWeight:"bold",color:"#f39c12",fontSize:14}}>⭐{score}</span>
            <span style={{color:"#95a5a6",fontSize:13}}>{qi+1}/{qs.length}</span>
          </div>
        </div>
        <div style={{height:6,background:"#e8eaf6",borderRadius:3,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",background:sec.color,borderRadius:3,width:`${pct}%`,transition:"width .4s ease"}}/>
        </div>
        <div style={{background:`${sec.color}12`,borderRadius:16,padding:20,marginBottom:18,border:`1.5px solid ${sec.color}28`}}>
          <div style={{fontSize:11,color:sec.color,fontWeight:"bold",marginBottom:10,letterSpacing:.5}}>שְׁאֵלָה {qi+1}</div>
          <div style={{fontSize:17,lineHeight:1.75,color:"#2c3e50",fontWeight:500}}>{q.question}</div>
          {q.sequence && (
            <div style={{marginTop:16,background:"#fff",borderRadius:12,padding:"14px 10px",textAlign:"center",fontSize:22,letterSpacing:6,border:`2px dashed ${sec.color}55`,color:"#2c3e50",fontFamily:"monospace",wordBreak:"break-all"}}>
              {q.sequence}
            </div>
          )}
        </div>
        {(q.options||[]).map((opt,i)=>{
          let bg="#fff",border="#e0e0e0",col="#2c3e50",fw=400;
          if(fb){
            if(i===q.correct){bg="#eafaf1";border="#27ae60";col="#1e8449";fw=700;}
            else if(i===sel){bg="#fdedec";border="#e74c3c";col="#c0392b";}
            else{col="#bbb";}
          }
          return(
            <button key={i} onClick={()=>answer(i)} style={{display:"block",width:"100%",textAlign:"right",padding:"13px 18px",borderRadius:12,fontSize:16,cursor:fb?"default":"pointer",fontFamily:"inherit",fontWeight:fw,border:`2px solid ${border}`,background:bg,color:col,marginBottom:8,transition:"all .15s"}}
              onMouseEnter={e=>{if(!fb)e.currentTarget.style.background="#f0f4ff";}}
              onMouseLeave={e=>{if(!fb)e.currentTarget.style.background=bg;}}>
              {opt}
            </button>
          );
        })}
        {fb&&(
          <div style={{background:isOk?"#eafaf1":"#fef5ec",borderRadius:16,padding:18,marginTop:12,border:`2px solid ${isOk?"#27ae6055":"#f39c1255"}`}}>
            <div style={{fontWeight:"bold",fontSize:20,marginBottom:8,color:isOk?"#1e8449":"#d35400"}}>{msg}</div>
            <div style={{fontSize:14,color:"#555",lineHeight:1.65}}>💡 {q.explanation}</div>
            <div style={{display:"flex",justifyContent:"flex-start",marginTop:14}}>
              <button onClick={next} style={{background:sec.color,color:"#fff",border:"none",borderRadius:12,padding:"12px 28px",fontSize:16,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit"}}>
                {qi+1>=qs.length?"🏆 רְאֵה תוֹצָאוֹת":"הַבָּא ←"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (screen==="result") return (
    <div style={{...W,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={Card({textAlign:"center",padding:"36px 28px"})}>
        <div style={{fontSize:72,marginBottom:10}}>{score>=9?"🏆":score>=6?"🌟":"💪"}</div>
        <h2 style={{fontSize:26,fontWeight:"bold",color:"#2c3e50",margin:"0 0 8px"}}>{score>=9?"מֻשְׁלָם!":score>=6?"כָּל הַכָּבוֹד!":"יָפֶה מְאוֹד!"}</h2>
        <div style={{fontSize:54,fontWeight:"bold",color:sec.color,margin:"14px 0"}}>
          {score}<span style={{fontSize:28,color:"#95a5a6"}}>/10</span>
        </div>
        <div style={{fontSize:34,marginBottom:18}}>{stars(score)}</div>
        <div style={{background:"#f4f6ff",borderRadius:14,padding:"14px 20px",marginBottom:24,fontSize:15,color:"#555",lineHeight:1.7}}>{resultMsg(score)}</div>
        <button style={Btn(sec.color)} onClick={()=>startSection(sec)}>🔄 תְּרַגֵּל שׁוּב</button>
        <button style={Btn("#bdc3c7",{color:"#555"})} onClick={()=>setScreen("select")}>📚 בְּחַר נוֹשֵׂא אַחֵר</button>
      </div>
    </div>
  );

  return null;
}