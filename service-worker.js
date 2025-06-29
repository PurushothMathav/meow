const CACHE_NAME = 'kukufm-v2906251500';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const UPDATE_CHECK_INTERVAL = 30000; // Check for updates every 30 seconds

// Files to cache immediately
const STATIC_ASSETS = [
  "/meow/",
  "/meow/index.html",
  "/meow/manifest.json",
  "/meow/service-worker.js",
  "/meow/icons/favicon-48x48.png",
  "/meow/icons/favicon-72x72.png",
  "/meow/icons/favicon-96x96.png",
  "/meow/icons/favicon-144x144.png",
  "/meow/icons/favicon-192x192.png",
  "/meow/icons/favicon-512x512.png",
    "/meow/json/7 Assasins-Tamil.json",
    "/meow/json/A Heartbeat Away-English.json",
    "/meow/json/A Heartbeat Away-Hindi.json",
    "/meow/json/A Heartbeat Away-Kannada.json",
    "/meow/json/A Heartbeat Away-Malayalam.json",
    "/meow/json/A Vow of Joy and Sorrow-Bengali.json",
    "/meow/json/A Vow of Joy and Sorrow-English.json",
    "/meow/json/A Vow of Joy and Sorrow-Hindi.json",
    "/meow/json/A Vow of Joy and Sorrow-Tamil.json",
    "/meow/json/After Divorce , the ex-wife of the big shot  stirs up the world-Hindi.json",
    "/meow/json/After Divorce , the ex-wife of the big shot  stirs up the world-Kannada.json",
    "/meow/json/After Divorce , the ex-wife of the big shot  stirs up the world-Malayalam.json",
    "/meow/json/After Divorce , the ex-wife of the big shot  stirs up the world-Tamil.json",
    "/meow/json/After divorce, my wife become a trillionaire-Tamil.json",
    "/meow/json/After Divorcing my Star Wife, I became famous-Bengali.json",
    "/meow/json/After Divorcing my Star Wife, I became famous-Hindi.json",
    "/meow/json/After Divorcing my Star Wife, I became famous-Tamil.json",
    "/meow/json/After Divorcing my Star Wife, I became famous-Telugu.json",
    "/meow/json/After dumping that scumbag, my three elder brothers spoil me like crazy-Malayalam.json",
    "/meow/json/Alien Opponent-Hindi.json",
    "/meow/json/Alien Opponent-Tamil.json",
    "/meow/json/Alien Opponent-Telugu.json",
    "/meow/json/Alpha's Perfect Love-Bengali.json",
    "/meow/json/Alpha's Perfect Love-English.json",
    "/meow/json/Alpha's Perfect Love-Hindi.json",
    "/meow/json/Alpha's Perfect Love-Kannada.json",
    "/meow/json/Alpha's Perfect Love-Malayalam.json",
    "/meow/json/Alpha's Perfect Love-Tamil.json",
    "/meow/json/Alpha's Perfect Love-Telugu.json",
    "/meow/json/Alpha, She Wasn't the One-Bengali.json",
    "/meow/json/Alpha, She Wasn't the One-English.json",
    "/meow/json/Alpha, She Wasn't the One-Hindi.json",
    "/meow/json/Alpha, She Wasn't the One-Kannada.json",
    "/meow/json/Alpha, She Wasn't the One-Malayalam.json",
    "/meow/json/Alpha, She Wasn't the One-Tamil.json",
    "/meow/json/Alpha, She Wasn't the One-Telugu.json",
    "/meow/json/As You Wish-Bengali.json",
    "/meow/json/As You Wish-Hindi.json",
    "/meow/json/As You Wish-Kannada.json",
    "/meow/json/As You Wish-Tamil.json",
    "/meow/json/As You Wish-Telugu.json",
    "/meow/json/Aunt is not easy to provoke-Bengali.json",
    "/meow/json/Aunt is not easy to provoke-Hindi.json",
    "/meow/json/Aunt is not easy to provoke-Tamil.json",
    "/meow/json/Aunt is not easy to provoke-Telugu.json",
    "/meow/json/Aval Varuvaala-Tamil.json",
    "/meow/json/Avanum Naanum-Tamil.json",
    "/meow/json/Back to 1990-Bengali.json",
    "/meow/json/Back to 1990-Hindi.json",
    "/meow/json/Back to 1990-Kannada.json",
    "/meow/json/Back to 1990-Tamil.json",
    "/meow/json/Back to 1990-Telugu.json",
    "/meow/json/BACK TO 1994-Tamil.json",
    "/meow/json/BACK TO 1994-Telugu.json",
    "/meow/json/Becoming Light-Bengali.json",
    "/meow/json/Becoming Light-Hindi.json",
    "/meow/json/Becoming Light-Kannada.json",
    "/meow/json/Becoming Light-Tamil.json",
    "/meow/json/Bepanah Ishq-Hindi.json",
    "/meow/json/Betrayed Heiress - Vengeance Reborn-Bengali.json",
    "/meow/json/Betrayed Heiress - Vengeance Reborn-Hindi.json",
    "/meow/json/Betrayed Heiress - Vengeance Reborn-Tamil.json",
    "/meow/json/Betrayed Heiress - Vengeance Reborn-Telugu.json",
    "/meow/json/BETREYED HEIRESS; VENGEANCE REBORN-Malayalam.json",
    "/meow/json/Billionaire Daddy, the Hunt is On-Bengali.json",
    "/meow/json/Billionaire Daddy, the Hunt is On-English.json",
    "/meow/json/Billionaire Daddy, the Hunt is On-Hindi.json",
    "/meow/json/Billionaire Daddy, the Hunt is On-Kannada.json",
    "/meow/json/Billionaire Daddy, the Hunt is On-Malayalam.json",
    "/meow/json/Billionaire Daddy, the Hunt is On-Tamil.json",
    "/meow/json/Billionaire Playboy's Replacement Bride-Bengali.json",
    "/meow/json/Billionaire Playboy's Replacement Bride-English.json",
    "/meow/json/Billionaire Playboy's Replacement Bride-Hindi.json",
    "/meow/json/Billionaire Playboy's Replacement Bride-Tamil.json",
    "/meow/json/Billionaire Playboys Replacement Bride-Telugu.json",
    "/meow/json/Black Widow-Bengali.json",
    "/meow/json/Black Widow-Hindi.json",
    "/meow/json/Black Widow-Tamil.json",
    "/meow/json/Black Widow-Telugu.json",
    "/meow/json/Blossoms 2003-Malayalam.json",
    "/meow/json/Blossoms 2003-Tamil.json",
    "/meow/json/Blossoms 2003-Telugu.json",
    "/meow/json/Boss And the Sweet Wife-Bengali.json",
    "/meow/json/Boss And the Sweet Wife-Hindi.json",
    "/meow/json/Boss And the Sweet Wife-Malayalam.json",
    "/meow/json/Boss And the Sweet Wife-Tamil.json",
    "/meow/json/Boss And the Sweet Wife-Telugu.json",
    "/meow/json/Charming Son-in-Law-Hindi.json",
    "/meow/json/Charming Son-in-Law-Kannada.json",
    "/meow/json/Charming Son-in-Law-Tamil.json",
    "/meow/json/Chen Yi - The Rich Man's Secret-Tamil.json",
    "/meow/json/Chinese New Year - The Hidden Dragon Returns to the Village-Bengali.json",
    "/meow/json/Chinese New Year - The Hidden Dragon Returns to the Village-Tamil.json",
    "/meow/json/Cleopatra-English.json",
    "/meow/json/Cleopatra-Hindi.json",
    "/meow/json/Cleopatra-Malayalam.json",
    "/meow/json/Cleopatra-Marathi.json",
    "/meow/json/Cleopatra-Telugu.json",
    "/meow/json/Cleopatra-Tamil.json",
    "/meow/json/Cloaked in Power_ His Secret Identity-Malayalam.json",
    "/meow/json/Contract Pregnant wife-Hindi.json",
    "/meow/json/Contract Pregnant wife-Kannada.json",
    "/meow/json/Contract Pregnant wife-Malayalam.json",
    "/meow/json/Contract Pregnant wife-Tamil.json",
    "/meow/json/Contract Pregnant wife-Telugu.json",
    "/meow/json/Crowned in Love-Tamil.json",
    "/meow/json/Cubicle Cupid's Twist-Hindi.json",
    "/meow/json/Cubicle Cupid's Twist-Tamil.json",
    "/meow/json/Cubicle Cupid's Twist-Telugu.json",
    "/meow/json/CUBICLE CUPIDS TEST-Malayalam.json",
    "/meow/json/Cursed Daughter-Bengali.json",
    "/meow/json/Cursed Daughter-Hindi.json",
    "/meow/json/Cursed Daughter-Tamil.json",
    "/meow/json/Cursed Daughter-Telugu.json",
    "/meow/json/Cute Baby Assists _ I Help My Mom Marry the President Tycoon-Kannada.json",
    "/meow/json/Cute Baby Assists _ I Help my Mom Marry the President Tycoon-Malayalam.json",
    "/meow/json/Cute Baby Assists_ I Help My Mom Marry the President Tycoon-Bengali.json",
    "/meow/json/Cute Baby Assists_ I Help My Mom Marry the President Tycoon-Hindi.json",
    "/meow/json/Cute Baby Assists_ I Help My Mom Marry the President Tycoon-Tamil.json",
    "/meow/json/Cute Baby Assists_ I Help My Mom Marry the President Tycoon-Telugu.json",
    "/meow/json/Defying Destiny-Bengali.json",
    "/meow/json/Defying Destiny-Hindi.json",
    "/meow/json/Defying Destiny-Kannada.json",
    "/meow/json/Defying Destiny-Malayalam.json",
    "/meow/json/Defying Destiny-Telugu.json",
    "/meow/json/Desperate Cage - Miss Sun Fights Back-Bengali.json",
    "/meow/json/Desperate Cage - Miss Sun Fights Back-Tamil.json",
    "/meow/json/Desperate Cage - Miss Sun Fights Back-Telugu.json",
    "/meow/json/Desperate Husband's Revenge-Bengali.json",
    "/meow/json/Desperate Husband's Revenge-Tamil.json",
    "/meow/json/Desperate Husband's Revenge-Telugu.json",
    "/meow/json/Destined to Meet You-Bengali.json",
    "/meow/json/Destined to Meet You-Hindi.json",
    "/meow/json/Destined to Meet You-Malayalam.json",
    "/meow/json/Destined to Meet You-Tamil.json",
    "/meow/json/Destined to Meet You-Telugu.json",
    "/meow/json/Detective of the Republic_ Chasing the Killer-Hindi.json",
    "/meow/json/Detective of the Republic_ Chasing the Killer-Kannada.json",
    "/meow/json/Detective of the Republic_ Chasing the Killer-Malayalam.json",
    "/meow/json/Divorced Billionaire Heiress-English.json",
    "/meow/json/Divorced Billionaire Heiress-Hindi.json",
    "/meow/json/Divorced Billionaire Heiress-Malayalam.json",
    "/meow/json/Divorced Billionaire Heiress-Tamil.json",
    "/meow/json/Divorced Billionaire Heiress-Telugu.json",
    "/meow/json/Divorced But Doted Upon by the Trio-Kannada.json",
    "/meow/json/Divorced But Doted Upon by the Trio-Tamil.json",
    "/meow/json/Divorced But Doted Upon by the Trio-Telugu.json",
    "/meow/json/Divorced Single Mother-Bengali.json",
    "/meow/json/Divorced Single Mother-Hindi.json",
    "/meow/json/Divorced Single Mother-Kannada.json",
    "/meow/json/Divorced Single Mother-Malayalam.json",
    "/meow/json/Divorced Single Mother-Tamil.json",
    "/meow/json/Divorced Single Mother-Telugu.json",
    "/meow/json/Don't Get Your Heart Fluttering for Me-Bengali.json",
    "/meow/json/Don't Get Your Heart Fluttering for Me-Hindi.json",
    "/meow/json/Don't Get Your Heart Fluttering for Me-Tamil.json",
    "/meow/json/Don't mess With blind heiress-Malayalam.json",
    "/meow/json/Don't Mess with Blind Heiress-Tamil.json",
    "/meow/json/Don't Mess With Super DAD-Bengali.json",
    "/meow/json/Don't Mess With Super DAD-Hindi.json",
    "/meow/json/Don't Mess With Super DAD-Kannada.json",
    "/meow/json/Don't Mess With Super DAD-Malayalam.json",
    "/meow/json/Don't Mess With Super DAD-Tamil.json",
    "/meow/json/Don't Mess With Super DAD-Telugu.json",
    "/meow/json/Don't Mess With The Blind Heiress-English.json",
    "/meow/json/Don't Speak-Hindi.json",
    "/meow/json/Don't Speak-Tamil.json",
    "/meow/json/Don't touch my Daughter-Bengali.json",
    "/meow/json/Don't touch my Daughter-English.json",
    "/meow/json/Don't touch my Daughter-Hindi.json",
    "/meow/json/Don't touch my Daughter-Kannada.json",
    "/meow/json/Don't touch my Daughter-Malayalam.json",
    "/meow/json/Don't touch my Daughter-Tamil.json",
    "/meow/json/Don't touch my Daughter-Telugu.json",
    "/meow/json/Double Life CEO_ Chasing Love-Bengali.json",
    "/meow/json/Double Life CEO_ Chasing Love-Hindi.json",
    "/meow/json/Double Life CEO_ Chasing Love-Malayalam.json",
    "/meow/json/Double Life CEO_ Chasing Love-Tamil.json",
    "/meow/json/Double Life CEO_ Chasing Love-Telugu.json",
    "/meow/json/Dracula's Curse-Hindi.json",
    "/meow/json/Dracula's Curse-Kannada.json",
    "/meow/json/Dracula's Curse-Tamil.json",
    "/meow/json/Dracula's Curse-Telugu.json",
    "/meow/json/Dracula's Kiss_ Spellbound By A Doppelganger-English.json",
    "/meow/json/Dual Plants' Decision-Tamil.json",
    "/meow/json/Dual Plants' Decision-Telugu.json",
    "/meow/json/DUMPING MR.BILLIONAIRE-Malayalam.json",
    "/meow/json/Echoes Of Vengeance-English.json",
    "/meow/json/Ek Anjani Shaadi-Bengali.json",
    "/meow/json/Ek Anjani Shaadi-Malayalam.json",
    "/meow/json/Emperor Yan-Tamil.json",
    "/meow/json/Enemies with Benefits - The CEO's Matchmaker Strikes-English.json",
    "/meow/json/Enemies with Benefits - The CEO's Matchmaker Strikes-Hindi.json",
    "/meow/json/Enemies with Benefits - The CEO's Matchmaker Strikes-Kannada.json",
    "/meow/json/Enemies with Benefits - The CEO's Matchmaker Strikes-Tamil.json",
    "/meow/json/Enemies with Benefits - The CEO's Matchmaker Strikes-Telugu.json",
    "/meow/json/Eternal Life for Three Millennia-Malayalam.json",
    "/meow/json/Eternal Life for Three Millennia-Tamil.json",
    "/meow/json/Eternal life for Three Millennia-Telugu.json",
    "/meow/json/Eye without a face-Hindi.json",
    "/meow/json/Eye without a face-Kannada.json",
    "/meow/json/Eye without a face-Malayalam.json",
    "/meow/json/Eye without a face-Tamil.json",
    "/meow/json/Eye without a face-Telugu.json",
    "/meow/json/Fake boyfriend-Bengali.json",
    "/meow/json/Fake boyfriend-Hindi.json",
    "/meow/json/Fake boyfriend-Kannada.json",
    "/meow/json/Fake boyfriend-Malayalam.json",
    "/meow/json/Fake boyfriend-Tamil.json",
    "/meow/json/Fake boyfriend-Telugu.json",
    "/meow/json/Fall Into Sweet Trap-English.json",
    "/meow/json/Fallen Angel-Bengali.json",
    "/meow/json/Fallen Angel-English.json",
    "/meow/json/Fallen Angel-Malayalam.json",
    "/meow/json/Father’s Kindness, Son’s Filial Piety-Tamil.json",
    "/meow/json/Fearless Son-in-law-Malayalam.json",
    "/meow/json/First Light of Love-Hindi.json",
    "/meow/json/First Light of Love-Kannada.json",
    "/meow/json/First Light of Love-Malayalam.json",
    "/meow/json/First Light of Love-Tamil.json",
    "/meow/json/First Light of Love-Telugu.json",
    "/meow/json/Flash Marriage-Kannada.json",
    "/meow/json/Flash Marriage-Tamil.json",
    "/meow/json/Flash Marriage-Telugu.json",
    "/meow/json/Flash Marriage with a Big Shot-Bengali.json",
    "/meow/json/Flash Marriage with a Big Shot-Tamil.json",
    "/meow/json/Flash Marriage with a Big Shot-Telugu.json",
    "/meow/json/Flashback Fiancee _ Have we Met-Telugu.json",
    "/meow/json/Flashback Fiancée_ Have We Met-English.json",
    "/meow/json/Flashback Fiancée_ Have We Met-English.json",
    "/meow/json/Flashback Fiancée_ Have We Met_-Malayalam.json",
    "/meow/json/Fleeing Husband Please Love Me All Over Again-Bengali.json",
    "/meow/json/Fleeing Husband Please Love Me All Over Again-Hindi.json",
    "/meow/json/Fleeing Husband Please Love Me All Over Again-Malayalam.json",
    "/meow/json/Fleeing Husband Please Love Me All Over Again-Telugu.json",
    "/meow/json/Fleeing Husband_ Please Love Me All Over Again-English.json",
    "/meow/json/Fleeing Husband_ Please Love Me All Over Again-English.json",
    "/meow/json/Forbidden Bonds with My Brothers-Bengali.json",
    "/meow/json/Forbidden Bonds with My Brothers-English.json",
    "/meow/json/Forbidden Bonds with My Brothers-Hindi.json",
    "/meow/json/Forbidden Bonds with My Brothers-Kannada.json",
    "/meow/json/Forbidden Bonds with My Brothers-Malayalam.json",
    "/meow/json/Forbidden Bonds with My Brothers-Tamil.json",
    "/meow/json/Forbidden Bonds with My Brothers-Telugu.json",
    "/meow/json/Forever Love-Bengali.json",
    "/meow/json/Forever Love-Hindi.json",
    "/meow/json/Forever Love-Kannada.json",
    "/meow/json/Forever Love-Tamil.json",
    "/meow/json/FROM ZERO TO HERO Breaking the chains of Fate-Hindi.json",
    "/meow/json/FROM ZERO TO HERO Breaking the chains of Fate-Malayalam.json",
    "/meow/json/FROM ZERO TO HERO Breaking the chains of Fate-Tamil.json",
    "/meow/json/Ghost Killer Vs Bloody Marry-Hindi.json",
    "/meow/json/Ghost Killer Vs Bloody Marry-Kannada.json",
    "/meow/json/Ghost Killer Vs Bloody Marry-Tamil.json",
    "/meow/json/Give me a Hug-Bengali.json",
    "/meow/json/Give me a Hug-Malayalam.json",
    "/meow/json/Give me a Hug-Tamil.json",
    "/meow/json/Gone, Yet Loved by Him-Bengali.json",
    "/meow/json/Gone, Yet Loved by Him-English.json",
    "/meow/json/Gone, Yet Loved by Him-Hindi.json",
    "/meow/json/Gone, Yet Loved by Him-Malayalam.json",
    "/meow/json/Gone, Yet Loved by Him-Tamil.json",
    "/meow/json/Gone, Yet Loved by Him-Telugu.json",
    "/meow/json/Got you Mr. Always Right-English.json",
    "/meow/json/Got you Mr. Always Right-Bengali.json",
    "/meow/json/Got you Mr. Always Right-English.json",
    "/meow/json/Got you Mr. Always Right-Kannada.json",
    "/meow/json/Got you Mr. Always Right-Malayalam.json",
    "/meow/json/Got you Mr. Always Right-Tamil.json",
    "/meow/json/Got you Mr. Always Right-Telugu.json",
    "/meow/json/Got you Mr. Always Right.json",
    "/meow/json/Guardian Angel Mom on the Move-Hindi.json",
    "/meow/json/Guardian Angel Mom on the Move-Kannada.json",
    "/meow/json/Guardian Angel Mom on the Move-Malayalam.json",
    "/meow/json/Guardian Angel Mom on the Move-Tamil.json",
    "/meow/json/Guardian Angel Mom on the Move-Telugu.json",
    "/meow/json/Hansel vs Gretel-Hindi.json",
    "/meow/json/Hansel vs Gretel-Tamil.json",
    "/meow/json/Happily Never After-Bengali.json",
    "/meow/json/Happily Never After-Hindi.json",
    "/meow/json/Happily Never After-Kannada.json",
    "/meow/json/Happily Never After-Tamil.json",
    "/meow/json/Happily Never After-Telugu.json",
    "/meow/json/Harvest of ambition, a CEO's odyssey-Bengali.json",
    "/meow/json/Harvest of ambition, a CEO's odyssey-Hindi.json",
    "/meow/json/Harvest of ambition, a CEO's odyssey-Kannada.json",
    "/meow/json/Harvest of ambition, a CEO's odyssey-Malayalam.json",
    "/meow/json/Harvest of ambition, a CEO's odyssey-Tamil.json",
    "/meow/json/Harvest of ambition, a CEO's odyssey-Telugu.json",
    "/meow/json/Held for Ransom-Hindi.json",
    "/meow/json/Held for Ransom-Tamil.json",
    "/meow/json/Held for Ransom-Telugu.json",
    "/meow/json/Hero of Construction Site-Tamil.json",
    "/meow/json/Hidden Agenda-English.json",
    "/meow/json/Hidden Billionaire-Hindi.json",
    "/meow/json/Hidden Billionaire-Tamil.json",
    "/meow/json/Hidden Billionaire-Telugu.json",
    "/meow/json/Hollywood Staged Romance Live 24_7-Hindi.json",
    "/meow/json/Hollywood Staged Romance Live 24_7-Kannada.json",
    "/meow/json/Hollywood Staged Romance Live 24_7-Malayalam.json",
    "/meow/json/Hollywood Staged Romance Live 24_7-Tamil.json",
    "/meow/json/Hollywood Staged Romance Live 24_7-Telugu.json",
    "/meow/json/Hollywood Staged Romance_ Live 24_7-Bengali.json",
    "/meow/json/Hollywood Staged Romance_ Live 24_7-English.json",
    "/meow/json/Hollywood Star's Fake Girlfriend-English.json",
    "/meow/json/How I Became The Alpha Queen-English.json",
    "/meow/json/I'm Obsessed With My Boss_ Part I-English.json",
    "/meow/json/I'm Obsessed With My Boss_ Part II-English.json",
    "/meow/json/In Love With My Godfather's Daughter-English.json",
    "/meow/json/In search of Jade-Tamil.json",
    "/meow/json/In search of Jade-Telugu.json",
    "/meow/json/Iruvar-Tamil.json",
    "/meow/json/Ithayaththil Ethovondru-Tamil.json",
    "/meow/json/Jurassic Shark-Hindi.json",
    "/meow/json/Jurassic Shark-Tamil.json",
    "/meow/json/Justice & The Beast-Tamil.json",
    "/meow/json/Kaatru Veliyidai-Tamil.json",
    "/meow/json/Kanave Kalaiyaathe-Tamil.json",
    "/meow/json/Kanden Kathalai-Hindi.json",
    "/meow/json/Kanden Kathalai-Malayalam.json",
    "/meow/json/Kanden Kathalai-Tamil.json",
    "/meow/json/Kanden Kathalai-Telugu.json",
    "/meow/json/King's Wrath - Blood and Betrayal-Tamil.json",
    "/meow/json/Kiss And Switch_ The Cursed Vampire-English.json",
    "/meow/json/Late Love-Bengali.json",
    "/meow/json/Late Love-Hindi.json",
    "/meow/json/Late Love-Kannada.json",
    "/meow/json/Late Love-Tamil.json",
    "/meow/json/Late Love-Telugu.json",
    "/meow/json/Later Days-Hindi.json",
    "/meow/json/Later Days-Kannada.json",
    "/meow/json/Later Days-Tamil.json",
    "/meow/json/Legend-Tamil.json",
    "/meow/json/Let Me Go, My Queen-Bengali.json",
    "/meow/json/Let Me Go, My Queen-English.json",
    "/meow/json/Let Me Go, My Queen-Hindi.json",
    "/meow/json/Let Me Go, My Queen-Kannada.json",
    "/meow/json/Let Me Go, My Queen-Malayalam.json",
    "/meow/json/Let Me Go, My Queen-Tamil.json",
    "/meow/json/Let Me Go, My Queen-Telugu.json",
    "/meow/json/Losing My Virginity-Bengali.json",
    "/meow/json/Losing My Virginity-Malayalam.json",
    "/meow/json/Losing My Virginity-Tamil.json",
    "/meow/json/Losing My Virginity-Telugu.json",
    "/meow/json/Lost in Love-Bengali.json",
    "/meow/json/Lost in Love-Hindi.json",
    "/meow/json/Lost in Love-Malayalam.json",
    "/meow/json/Lost in Love-Tamil.json",
    "/meow/json/Lost in Love-Telugu.json",
    "/meow/json/Love and Deceit-Malayalam.json",
    "/meow/json/Love is Right In front of You-Bengali.json",
    "/meow/json/Love is Right In front of You-Hindi.json",
    "/meow/json/Love is Right In front of You-Kannada.json",
    "/meow/json/Love is Right In front of You-Tamil.json",
    "/meow/json/Love is Right In front of You-Telugu.json",
    "/meow/json/Love Mafia-Tamil.json",
    "/meow/json/Love Me Not-Hindi.json",
    "/meow/json/LOVE TEASE-Bengali.json",
    "/meow/json/Love Tease-Malayalam.json",
    "/meow/json/Love Tease-Telugu.json",
    "/meow/json/Lucifer My Boyfriend from Hell-Hindi.json",
    "/meow/json/Lucifer My Boyfriend from Hell-Malayalam.json",
    "/meow/json/Lucifer my boyfriend from hell-Tamil.json",
    "/meow/json/Lucifer My Boyfriend from Hell-Telugu.json",
    "/meow/json/LUCIFER, MY BOYFRIEND FROM HELL-Bengali.json",
    "/meow/json/Lucifer, My Boyfriend From Hell-English.json",
    "/meow/json/Maayavan-Tamil.json",
    "/meow/json/Madam Wants To Sell Fish-Bengali.json",
    "/meow/json/Madam Wants To Sell Fish-Hindi.json",
    "/meow/json/Madam Wants To Sell Fish-Kannada.json",
    "/meow/json/Madam Wants to Sell Fish-Tamil.json",
    "/meow/json/Madam Wants To Sell Fish-Telugu.json",
    "/meow/json/Madam, Don't Run-English.json",
    "/meow/json/Madison County picked up a billionaire-Tamil.json",
    "/meow/json/Mafia Lord's Son Has Secret Love For His Stepmom-English.json",
    "/meow/json/Mafia Se Mohabbat-Hindi.json",
    "/meow/json/Mafia se Mohabbat-Malayalam.json",
    "/meow/json/Malibu Crush-Hindi.json",
    "/meow/json/Malibu Crush-Tamil.json",
    "/meow/json/Marriage as a Debt of Gratitude-Malayalam.json",
    "/meow/json/Married But Available_ Perfume And Moon-English.json",
    "/meow/json/Married But Available_ Perfume And Moon-English.json",
    "/meow/json/Married But Available_ Perfume And Moon-Malayalam.json",
    "/meow/json/Married But Available_ Perfume And Moon-Tamil.json",
    "/meow/json/Married But Available_ Perfume and Moon-Telugu.json",
    "/meow/json/Married But Available_ Perfume And Moon-Hindi.json",
    "/meow/json/Married the Boss, Accidentally-English.json",
    "/meow/json/Migrant Worker's Love Story-Bengali.json",
    "/meow/json/Migrant worker's love story-Malayalam.json",
    "/meow/json/Migrant Worker's Love Story-Telugu.json",
    "/meow/json/Migrant Workers Love Story-Kannada.json",
    "/meow/json/MIGRANT WORKERS LOVE STORY-Tamil.json",
    "/meow/json/Mind-Reading Game-Tamil.json",
    "/meow/json/Mine 9-Hindi.json",
    "/meow/json/Mine 9-Tamil.json",
    "/meow/json/Mine 9-Telugu.json",
    "/meow/json/Minnale-Tamil.json",
    "/meow/json/Mistaken Millionaire Husband-Tamil.json",
    "/meow/json/Misty Medical Immortal-Bengali.json",
    "/meow/json/Misty Medical Immortal-Malayalam.json",
    "/meow/json/Misty Medical Immortal-Tamil.json",
    "/meow/json/Mom’s Out and Taking Over-English.json",
    "/meow/json/Mother's Revenge-Tamil.json",
    "/meow/json/Mr. Idiot, Hero Husband-Tamil.json",
    "/meow/json/Mr. Ji, See Clearly, I'm Your Bodyguard-Bengali.json",
    "/meow/json/Mr. Ji, See Clearly, I'm Your Bodyguard-Tamil.json",
    "/meow/json/Mr. Ji, See Clearly, I'm Your Bodyguard-Telugu.json",
    "/meow/json/My 2 Fiances-English.json",
    "/meow/json/My 2 Fiances-Kannada.json",
    "/meow/json/My 2 Fiances-Malayalam.json",
    "/meow/json/My 2 fiances-Tamil.json",
    "/meow/json/My 2 Fiancés-English.json",
    "/meow/json/My Brother, You Can't Afford to Mess With-Bengali.json",
    "/meow/json/My Brother, You Can't Afford to Mess With-Hindi.json",
    "/meow/json/My Brother, You Can't Afford to Mess with_-Kannada.json",
    "/meow/json/My Brother_ You can't afford to mess with-Tamil.json",
    "/meow/json/My Call Boy Billionaire Daddy-Bengali.json",
    "/meow/json/My Call Boy Billionaire Daddy-English.json",
    "/meow/json/My Call Boy Billionaire Daddy-Malayalam.json",
    "/meow/json/My Call Boy Billionaire Daddy-Tamil.json",
    "/meow/json/My Call Boy Billionaire Daddy-Telugu.json",
    "/meow/json/My Celebrity Boyfriend Killed Me-English.json",
    "/meow/json/My CEO made me Pregnant-Hindi.json",
    "/meow/json/My Cold Blooded Alpha King-English.json",
    "/meow/json/My Handsome Bodyguard-English.json",
    "/meow/json/My Handsome Bodyguard-Hindi.json",
    "/meow/json/My Handsome Bodyguard-Kannada.json",
    "/meow/json/MY Handsome Bodyguard-Malayalam.json",
    "/meow/json/My Handsome Bodyguard-Tamil.json",
    "/meow/json/My Handsome Bodyguard-Telugu.json",
    "/meow/json/My Husband Locked Me in an Underwater Prison-Tamil.json",
    "/meow/json/MY MYSTERIOUS PATIDEV-Hindi.json",
    "/meow/json/My Sister Stole My Man-English.json",
    "/meow/json/My Tycoon Husband Spoils Me-Hindi.json",
    "/meow/json/My Tycoon Husband Spoils Me-Kannada.json",
    "/meow/json/My Tycoon Husband Spoils Me-Malayalam.json",
    "/meow/json/My Tycoon husband Spoils Me-Tamil.json",
    "/meow/json/My Tycoon Husband Spoils Me-Telugu.json",
    "/meow/json/Mysterious Murderer-English.json",
    "/meow/json/Nee Thanae En pon vasantham-Tamil.json",
    "/meow/json/Nee Varuvaai ena-Tamil.json",
    "/meow/json/Nenjam Marappathillai-Tamil.json",
    "/meow/json/Never Mess With A Badass Girl-English.json",
    "/meow/json/Old Man Returns-Tamil.json",
    "/meow/json/Once Upon a Divorce - The Double Life of Lady Diana-Tamil.json",
    "/meow/json/Once Upon a Divorce _ The Double Life of Lady Diana-Hindi.json",
    "/meow/json/Once Upon a Divorce_ The Double Life of Lady Diana-Bengali.json",
    "/meow/json/Once Upon A Divorce_ The Double Life Of Lady Diana-English.json",
    "/meow/json/Once Upon a Divorce_ The Double Life of Lady Diana-Telugu.json",
    "/meow/json/Once Upon A Divorce_The Double Life Of Lady Diana-Malayalam.json",
    "/meow/json/One Night Stand-English.json",
    "/meow/json/One night stand-Hindi.json",
    "/meow/json/Overcoming Obstacles_ The Counter attack On The Twin Babies-Tamil.json",
    "/meow/json/PALACE SECRETS-Tamil.json",
    "/meow/json/Phoenix Rising-Bengali.json",
    "/meow/json/Phoenix Rising-Hindi.json",
    "/meow/json/Phoenix Rising-Kannada.json",
    "/meow/json/Phoenix Rising-Malayalam.json",
    "/meow/json/Phoenix Rising-Tamil.json",
    "/meow/json/Phoenix Rising-Telugu.json",
    "/meow/json/Primal-Hindi.json",
    "/meow/json/Primal-Tamil.json",
    "/meow/json/Primal-Telugu.json",
    "/meow/json/Prisoned Sparrow-Tamil.json",
    "/meow/json/Pyaar Once Again-Hindi.json",
    "/meow/json/Pyaar, Dhokha Aur Badla-Hindi.json",
    "/meow/json/Ragasiya Snegithane-Tamil.json",
    "/meow/json/Rebirth of the City's Mad Doctor-Tamil.json",
    "/meow/json/Rebirth_ Hunting Crimes Album-Bengali.json",
    "/meow/json/Rebirth_ Hunting Crimes Album-Tamil.json",
    "/meow/json/Rebirth_ Hunting Crimes Album-Telugu.json",
    "/meow/json/Restart - The Peak-Hindi.json",
    "/meow/json/Restart - The Peak-Tamil.json",
    "/meow/json/Restart the Peak-Kannada.json",
    "/meow/json/Restart The Peak-Telugu.json",
    "/meow/json/Return of His Majesty-Bengali.json",
    "/meow/json/Return of his Majesty-Hindi.json",
    "/meow/json/Return of His Majesty-Kannada.json",
    "/meow/json/Return of His Majesty-Malayalam.json",
    "/meow/json/Return of His Majesty-Tamil.json",
    "/meow/json/Return of His Majesty-Telugu.json",
    "/meow/json/Return of the Supreme-Bengali.json",
    "/meow/json/Return of the Supreme-Hindi.json",
    "/meow/json/RETURN OF THE SUPREME-Tamil.json",
    "/meow/json/Return of the Supreme-Telugu.json",
    "/meow/json/Revenge Of My Fake Boyfriend-Tamil.json",
    "/meow/json/Revenge Of My Fake Boyfriend-Malayalam.json",
    "/meow/json/Rok sako to roko-Hindi.json",
    "/meow/json/Rok sako to roko-Hindi.json",
    "/meow/json/Romance With My Vampire Brother-English.json",
    "/meow/json/Romance with My Vampire Brother-Bengali.json",
    "/meow/json/Romance With My Vampire Brother-English.json",
    "/meow/json/Romance With My Vampire Brother-Kannada.json",
    "/meow/json/Romance with My Vampire Brother-Malayalam.json",
    "/meow/json/Romance With My Vampire Brother-Tamil.json",
    "/meow/json/Romance with My Vampire Brother-Telugu.json",
    "/meow/json/Rosy Psycho-English.json",
    "/meow/json/Royal Village Girl-Malayalam.json",
    "/meow/json/Runaway Bride-English.json",
    "/meow/json/Ruthless Comeback Of The Reborn Heiress-English.json",
    "/meow/json/Ruthless Comeback of the Reborn Heiress-Hindi.json",
    "/meow/json/Ruthless Comeback of the Reborn Heiress-Malayalam.json",
    "/meow/json/Ruthless Comeback Of The Reborn Heiress-Tamil.json",
    "/meow/json/Ruthless Comeback Of The Reborn Heiress-Telugu.json",
    "/meow/json/Saga Doctor _ The Secret Journey-Tamil.json",
    "/meow/json/Say I Love You When We Meet Again-English.json",
    "/meow/json/Say I Love You When We Meet Again-Hindi.json",
    "/meow/json/Say I Love You When We Meet Again-Tamil.json",
    "/meow/json/Say I Love You When We Meet Again-Telugu.json",
    "/meow/json/Say You Remember, Say You Love-English.json",
    "/meow/json/Say You Remember, Say You Love-Kannada.json",
    "/meow/json/Say You Remember, Say You Love-Malayalam.json",
    "/meow/json/Say You Remember, Say You Love-Tamil.json",
    "/meow/json/School Hall-English.json",
    "/meow/json/Secret Baby-Kannada.json",
    "/meow/json/Secret Baby-Malayalam.json",
    "/meow/json/Secret Baby-Tamil.json",
    "/meow/json/Secret Billionaire Villager-Bengali.json",
    "/meow/json/Secret Billionaire Villager-Kannada.json",
    "/meow/json/Secret billionaire Villager-Malayalam.json",
    "/meow/json/Secret Billionaire Villager-Telugu.json",
    "/meow/json/Secret Husband-Bengali.json",
    "/meow/json/Secret Husband-Kannada.json",
    "/meow/json/Secret Husband-Malayalam.json",
    "/meow/json/Secret Husband-Tamil.json",
    "/meow/json/Secret Husband-Telugu.json",
    "/meow/json/Secret Mrs CEO-Bengali.json",
    "/meow/json/Secret Mrs CEO-Hindi.json",
    "/meow/json/Secret Mrs CEO-Malayalam.json",
    "/meow/json/Secret Mrs CEO-Tamil.json",
    "/meow/json/Secret Mrs CEO-Telugu.json",
    "/meow/json/Shelter In The Mafia-Bengali.json",
    "/meow/json/Shelter In The Mafia-English.json",
    "/meow/json/Shelter In The Mafia-Hindi.json",
    "/meow/json/Shelter in the Mafia-Malayalam.json",
    "/meow/json/Shelter in the mafia-Tamil.json",
    "/meow/json/Shelter in the Mafia-Telugu.json",
    "/meow/json/Single but Pregnant_ An Unexpected Husband-Hindi.json",
    "/meow/json/Single but Pregnant_ An Unexpected Husband-Tamil.json",
    "/meow/json/Single but Pregnant_ An Unexpected Husband-Telugu.json",
    "/meow/json/Single Mother's Counterattack with Adorable Twins-Hindi.json",
    "/meow/json/Single Mother’s Counterattack with Adorable Twins-Kannada.json",
    "/meow/json/Single Mother’s Counterattack with Adorable Twins-Malayalam.json",
    "/meow/json/Single Mother’s Counterattack with Adorable Twins-Tamil.json",
    "/meow/json/Single Mother’s Counterattack with Adorable Twins-Telugu.json",
    "/meow/json/Sinister Squad-Hindi.json",
    "/meow/json/Sinister Squad-Tamil.json",
    "/meow/json/Sisters Have Crush On The Same Man-English.json",
    "/meow/json/Slay Madam-Hindi.json",
    "/meow/json/Slay Madam-Malayalam.json",
    "/meow/json/Slay Madam-Tamil.json",
    "/meow/json/Slay Madam-Telugu.json",
    "/meow/json/Slay, Madam-Kannada.json",
    "/meow/json/Spark My Fire-Bengali.json",
    "/meow/json/Spark My Fire-Hindi.json",
    "/meow/json/Spark My Fire-Kannada.json",
    "/meow/json/Spark My Fire-Malayalam.json",
    "/meow/json/Spark my fire-Tamil.json",
    "/meow/json/Spark My Fire-Telugu.json",
    "/meow/json/Spicy Robbery-Hindi.json",
    "/meow/json/Spicy Robbery-Tamil.json",
    "/meow/json/Spy Girl-Hindi.json",
    "/meow/json/Spy Girl-Tamil.json",
    "/meow/json/Spy Girl-Telugu.json",
    "/meow/json/Star Moon Romance _ Rejected And Reborn As Alpha-Malayalam.json",
    "/meow/json/STAR MOON ROMANCE REJECTED AND REBORN AS ALPHA-Telugu.json",
    "/meow/json/Star Moon Romance_ Rejected And Reborn As Alpha-English.json",
    "/meow/json/Star Moon Romance_ Rejected And Reborn As Alpha-Bengali.json",
    "/meow/json/Star Moon Romance_ Rejected And Reborn As Alpha-English.json",
    "/meow/json/Star Moon Romance_ Rejected And Reborn As Alpha-Hindi.json",
    "/meow/json/Star Moon Romance_ Rejected And Reborn As Alpha-Tamil.json",
    "/meow/json/Stealing the Spotlight from Her-English.json",
    "/meow/json/Stop pretending Miss Gu will expose everything-Malayalam.json",
    "/meow/json/Study God-Bengali.json",
    "/meow/json/Study God-Hindi.json",
    "/meow/json/Study God-Malayalam.json",
    "/meow/json/Study God-Tamil.json",
    "/meow/json/Study God-Telugu.json",
    "/meow/json/Sudari_ The wildfire-Tamil.json",
    "/meow/json/Super Can Pick Up the Missing King-Tamil.json",
    "/meow/json/Supreme Master asks you to believe in Science-Tamil.json",
    "/meow/json/Supreme Master Asks You to Believe in Science-Bengali.json",
    "/meow/json/Supreme Master Asks You to Believe in Science-Malayalam.json",
    "/meow/json/Supreme Master Asks You to Believe in Science-Telugu.json",
    "/meow/json/Supreme Wealth-Bengali.json",
    "/meow/json/Supreme Wealth-Hindi.json",
    "/meow/json/Supreme Wealth-Kannada.json",
    "/meow/json/Supreme Wealth-Malayalam.json",
    "/meow/json/Supreme Wealth-Tamil.json",
    "/meow/json/Supreme Wealth-Telugu.json",
    "/meow/json/Tangled Ties and Tipsy Vows-Bengali.json",
    "/meow/json/Tangled Ties And Tipsy Vows-English.json",
    "/meow/json/Tangled Ties and Tipsy Vows-Hindi.json",
    "/meow/json/Tangled Ties and Tipsy Vows-Malayalam.json",
    "/meow/json/Tangled Ties and Tipsy Vows-Tamil.json",
    "/meow/json/Tenacious Healer-Bengali.json",
    "/meow/json/TENACIOUS HEALER-Kannada.json",
    "/meow/json/Tenacious Healer-Malayalam.json",
    "/meow/json/TENACIOUS HEALER-Tamil.json",
    "/meow/json/Tenacious Healer-Telugu.json",
    "/meow/json/Terror Tales-Hindi.json",
    "/meow/json/Terror tales-Tamil.json",
    "/meow/json/The Ardent Scholar from a Poor Family-Bengali.json",
    "/meow/json/The Ardent Scholar From A Poor Family-Hindi.json",
    "/meow/json/The ardent scholar from a poor family-Tamil.json",
    "/meow/json/The Arrogant Tyrant's Runaway Wife-Tamil.json",
    "/meow/json/The Awakening-Bengali.json",
    "/meow/json/The Awakening-Hindi.json",
    "/meow/json/The Awakening-Malayalam.json",
    "/meow/json/The Awakening-Tamil.json",
    "/meow/json/The Billionaire in the Slum-Malayalam.json",
    "/meow/json/The Billionaire in the Slum-Tamil.json",
    "/meow/json/The Billionaire's Revenge-Malayalam.json",
    "/meow/json/The Blackthrones-English.json",
    "/meow/json/The Bridge To Nowhere-Hindi.json",
    "/meow/json/The Bridge to nowhere-Tamil.json",
    "/meow/json/The Chauffeur-English.json",
    "/meow/json/The Crown-English.json",
    "/meow/json/The Crowned Consort Of The Empress-English.json",
    "/meow/json/The Crowned Consort of the Empress-Hindi.json",
    "/meow/json/The Crowned Consort of the Empress-Kannada.json",
    "/meow/json/The Crowned Consort of the Empress-Tamil.json",
    "/meow/json/The Crowned Consort Of The Empress-Telugu.json",
    "/meow/json/The Dark Prison-Tamil.json",
    "/meow/json/The Devil Wears Desire-English.json",
    "/meow/json/The Devil Wears Desire-Kannada.json",
    "/meow/json/The Devil Wears Desire-Malayalam.json",
    "/meow/json/The Devil wears Desire-Tamil.json",
    "/meow/json/The Divorced Housewife Turned CEO-Hindi.json",
    "/meow/json/The Divorced Housewife Turned CEO-Kannada.json",
    "/meow/json/The Divorced Housewife Turned CEO-Malayalam.json",
    "/meow/json/The Divorced Housewife Turned CEO-Tamil.json",
    "/meow/json/The Divorced Housewife Turned CEO-Telugu.json",
    "/meow/json/The Dragon's Bride-Tamil.json",
    "/meow/json/The Dumb Billionaire Heiress In Love_ Part I-English.json",
    "/meow/json/The Dumb Billionaire Heiress In Love_ Part II-English.json",
    "/meow/json/The Escort-English.json",
    "/meow/json/The Final Boss-Hindi.json",
    "/meow/json/The Final Boss-Kannada.json",
    "/meow/json/The Final Boss-Malayalam.json",
    "/meow/json/The Final Boss-Tamil.json",
    "/meow/json/The Final Boss-Telugu.json",
    "/meow/json/The First Prince of Daxia-Bengali.json",
    "/meow/json/The First Prince Of Daxia-English.json",
    "/meow/json/The First Prince of Daxia-Hindi.json",
    "/meow/json/The First Prince of DAXIA-Tamil.json",
    "/meow/json/The Forgotten Mother-English.json",
    "/meow/json/The God King returns-Bengali.json",
    "/meow/json/The God King Returns-Malayalam.json",
    "/meow/json/The God King Returns-Tamil.json",
    "/meow/json/The Hand Behind the Scenes-Kannada.json",
    "/meow/json/The Hand Behind the Scenes-Tamil.json",
    "/meow/json/The Immortal Doctor Dragon Xiang Nine Days-Hindi.json",
    "/meow/json/The Immortal Doctor Dragon Xiang Nine Days-Tamil.json",
    "/meow/json/The Immortal Doctor Dragon Xiang Nine Days-Telugu.json",
    "/meow/json/The Immortal Emperor Returns My Wife Pulled Out My Oxygen Tube-Bengali.json",
    "/meow/json/The Immortal Emperor Returns_ My Wife Pulled Out My Oxygen Tube-Tamil.json",
    "/meow/json/The Last Recipe-Bengali.json",
    "/meow/json/The Last Recipe-Hindi.json",
    "/meow/json/The Last Recipe-Kannada.json",
    "/meow/json/The Last Recipe-Malayalam.json",
    "/meow/json/The last recipe-Tamil.json",
    "/meow/json/The Lost Heir Rises-Malayalam.json",
    "/meow/json/The Love That Kills-Bengali.json",
    "/meow/json/The Love That Kills-Hindi.json",
    "/meow/json/The Love That Kills-Kannada.json",
    "/meow/json/The Love that Kills-Malayalam.json",
    "/meow/json/THE LOVE THAT KILLS-Tamil.json",
    "/meow/json/The Love That Kills-Telugu.json",
    "/meow/json/The Matrimonial Trap-Malayalam.json",
    "/meow/json/The Mistress Trap-English.json",
    "/meow/json/The Officer Fell for Me-Bengali.json",
    "/meow/json/The Officer Fell For Me-English.json",
    "/meow/json/The Officer Fell For Me-Hindi.json",
    "/meow/json/The Officer Fell For Me-Kannada.json",
    "/meow/json/The Officer Fell For me-Malayalam.json",
    "/meow/json/The officer fell for me-Tamil.json",
    "/meow/json/The Officer fell for me-Telugu.json",
    "/meow/json/The Old man Returns-Kannada.json",
    "/meow/json/The Old Man Returns-Malayalam.json",
    "/meow/json/The Peerless Emperor-Hindi.json",
    "/meow/json/The Peerless Emperor-Tamil.json",
    "/meow/json/The Peerless Emperor-Telugu.json",
    "/meow/json/The Phoenix Conspiracy-English.json",
    "/meow/json/The Possession Experiment-Hindi.json",
    "/meow/json/The Possession Experiment-Kannada.json",
    "/meow/json/The Possession Experiment-Tamil.json",
    "/meow/json/The Princess Married to my Waistcoat can not stop-Tamil.json",
    "/meow/json/The Royal Betrayal-Malayalam.json",
    "/meow/json/The Royal Secret-Hindi.json",
    "/meow/json/The Royal Secret-Tamil.json",
    "/meow/json/The Royal Secret-Telugu.json",
    "/meow/json/The Runaway CEO has Two Babies-Bengali.json",
    "/meow/json/The Runaway CEO has Two Babies-Malayalam.json",
    "/meow/json/The Runaway CEO has Two Babies-Tamil.json",
    "/meow/json/The Runaway CEO has Two Babies-Telugu.json",
    "/meow/json/The Sage Doctor-Bengali.json",
    "/meow/json/The Sage Doctor-Hindi.json",
    "/meow/json/The Sage Doctor-Kannada.json",
    "/meow/json/The Sage Doctor-Malayalam.json",
    "/meow/json/The Sage Doctor-Tamil.json",
    "/meow/json/The Sage Doctor-Telugu.json",
    "/meow/json/The Shadow’s counterattack-Malayalam.json",
    "/meow/json/The Stars Know My Heart-Bengali.json",
    "/meow/json/The Stars Know My Heart-English.json",
    "/meow/json/The Stars Know My Heart-Hindi.json",
    "/meow/json/The Stars Know My Heart-Kannada.json",
    "/meow/json/The Stars Know My Heart-Malayalam.json",
    "/meow/json/The Stars Know my Heart-Tamil.json",
    "/meow/json/The Stars Know My Heart-Telugu.json",
    "/meow/json/The Stay-Hindi.json",
    "/meow/json/The Stay-Tamil.json",
    "/meow/json/The Storm-Bengali.json",
    "/meow/json/The Storm-Hindi.json",
    "/meow/json/The Storm-Malayalam.json",
    "/meow/json/The Storm-Tamil.json",
    "/meow/json/The Storm-Telugu.json",
    "/meow/json/The Substitute Bride-Bengali.json",
    "/meow/json/The Substitute Bride-Hindi.json",
    "/meow/json/The Substitute Bride-Malayalam.json",
    "/meow/json/The Substitute Bride-Tamil.json",
    "/meow/json/The Substitute Bride-Telugu.json",
    "/meow/json/The Subtle Fragrance from the Deep Forest-Malayalam.json",
    "/meow/json/The Subtle Fragrance from the Deep Forest-Tamil.json",
    "/meow/json/The Taste of Miss Yun's Kiss-Tamil.json",
    "/meow/json/The Westward-Tamil.json",
    "/meow/json/The Westward Anime Season 1-Telugu.json",
    "/meow/json/The Westward Anime Season 2-Tamil.json",
    "/meow/json/The World in my grasp-Bengali.json",
    "/meow/json/The World In My Grasp-Hindi.json",
    "/meow/json/The World in my grasp-Kannada.json",
    "/meow/json/The World in my grasp-Malayalam.json",
    "/meow/json/The World in my grasp-Tamil.json",
    "/meow/json/The World in my grasp-Telugu.json",
    "/meow/json/The Wronged Mother-Bengali.json",
    "/meow/json/The Wronged Mother-Hindi.json",
    "/meow/json/The Wronged Mother-Malayalam.json",
    "/meow/json/The Wronged Mother-Tamil.json",
    "/meow/json/The Wronged Mother-Telugu.json",
    "/meow/json/There Is None Under Heaven to Equal Her-Bengali.json",
    "/meow/json/There is none under heaven to equal her-Telugu.json",
    "/meow/json/This Doctor is Very Powerful-Malayalam.json",
    "/meow/json/This Girl Is a Martial Master-Tamil.json",
    "/meow/json/Three Brothers Dote on Me-Bengali.json",
    "/meow/json/Three Brothers Dote On Me-English.json",
    "/meow/json/Three Brothers Dote on Me-Tamil.json",
    "/meow/json/Throne of Vengeance-Malayalam.json",
    "/meow/json/Tied By Fate-English.json",
    "/meow/json/Too Heavy To Handle-Bengali.json",
    "/meow/json/Too Heavy To Handle-Hindi.json",
    "/meow/json/Too Heavy to Handle-Kannada.json",
    "/meow/json/Too Heavy To Handle-Malayalam.json",
    "/meow/json/Too Heavy To Handle-Telugu.json",
    "/meow/json/Travel Back in Time _ 1991-Kannada.json",
    "/meow/json/Travel Back in Time _ 1991-Malayalam.json",
    "/meow/json/TRAVEL BACK IN TIME _ 1991-Tamil.json",
    "/meow/json/Travel Back in Time_ 1991-Telugu.json",
    "/meow/json/Triumphant Returns-Tamil.json",
    "/meow/json/True and False Dragon Commander-Bengali.json",
    "/meow/json/True and False Dragon Commander-Hindi.json",
    "/meow/json/True and false dragon commander-Tamil.json",
    "/meow/json/Twisted Fates-English.json",
    "/meow/json/Ulanskaya Ballada-Hindi.json",
    "/meow/json/Ulanskaya Ballada-Tamil.json",
    "/meow/json/Unrivalled in the Imperial Harem-Bengali.json",
    "/meow/json/Unrivalled in the Imperial Harem-Hindi.json",
    "/meow/json/Unrivalled in the Imperial Harem-Tamil.json",
    "/meow/json/Unscripted Romance_ In Love With My Substitute Wife-Hindi.json",
    "/meow/json/Unscripted Romance_ In Love With My Substitute Wife-Malayalam.json",
    "/meow/json/Unscripted Romance_ In Love With My Substitute Wife-Tamil.json",
    "/meow/json/Unscripted Romance_ In Love With My Substitute Wife-Telugu.json",
    "/meow/json/Unwed but Pregnant An Unexpected Husband-Kannada.json",
    "/meow/json/Unwed but Pregnant_ An Unexpected Husband-Malayalam.json",
    "/meow/json/Vamperifica-Hindi.json",
    "/meow/json/Vamperifica-Kannada.json",
    "/meow/json/Vamperifica-Tamil.json",
    "/meow/json/Vamperifica-Telugu.json",
    "/meow/json/Vicious Son in Law Don't Mess with Me-Telugu.json",
    "/meow/json/Vicious Son in Law, Don't Mess with Me-Bengali.json",
    "/meow/json/Vicious Son in Law, Don't Mess with Me-Hindi.json",
    "/meow/json/Vicious Son in Law, Don't Mess with Me-Malayalam.json",
    "/meow/json/Vicious Son in Law, Don't Mess with Me-Tamil.json",
    "/meow/json/Vicious Son-in-Law Don't Mess With Me-Kannada.json",
    "/meow/json/Villa Paradise-Hindi.json",
    "/meow/json/Villa Paradise-Tamil.json",
    "/meow/json/Villa paradise-Telugu.json",
    "/meow/json/Vortex-Tamil.json",
    "/meow/json/Waiting for Love-Bengali.json",
    "/meow/json/Waiting for Love-Hindi.json",
    "/meow/json/Waiting for Love-Kannada.json",
    "/meow/json/Waiting for Love-Telugu.json",
    "/meow/json/Waiting for Love -Malayalam.json",
    "/meow/json/Wake Up Dad Wedding Time-Telugu.json",
    "/meow/json/Wake Up Dad, Wedding Time-Hindi.json",
    "/meow/json/Wake Up, Dad Wedding Time-English.json",
    "/meow/json/Wake Up, Dad Wedding Time-Bengali.json",
    "/meow/json/Wake Up, Dad Wedding Time-English.json",
    "/meow/json/Wake Up, Dad Wedding Time-Malayalam.json",
    "/meow/json/Wealthy Hero-Bengali.json",
    "/meow/json/Wealthy Hero-Tamil.json",
    "/meow/json/When the Sun Sets on Us-Bengali.json",
    "/meow/json/When the Sun Sets on Us-Hindi.json",
    "/meow/json/When the Sun Sets on Us-Malayalam.json",
    "/meow/json/When the Sun Sets on Us-Tamil.json",
    "/meow/json/When the Sun Sets on Us-Telugu.json",
    "/meow/json/Where is my Home-Tamil.json",
    "/meow/json/Where Love Fades Away-Bengali.json",
    "/meow/json/Where Love Fades Away-Tamil.json",
    "/meow/json/Where Love Fades Away-Telugu.json",
    "/meow/json/Why Must the Boss Contractually Marry-Malayalam.json",
    "/meow/json/Why Must the Boss Contractually Marry-Tamil.json",
    "/meow/json/Wild Young Master Son-in-Law-Kannada.json",
    "/meow/json/WILD YOUNG MASTER SON-IN-LAW-Tamil.json",
    "/meow/json/Wild Young Master Son-in-Law-Telugu.json",
    "/meow/json/Witch Stars-Hindi.json",
    "/meow/json/Witch Stars-Kannada.json",
    "/meow/json/Witch Stars-Tamil.json",
    "/meow/json/Women Can Hold up Half the Sky-Tamil.json",
    "/meow/json/Wonder Boy Parth-Bengali.json",
    "/meow/json/Wonder Boy Parth-Hindi.json",
    "/meow/json/Wonder Boy Parth-Kannada.json",
    "/meow/json/Wonder Boy Parth-Malayalam.json",
    "/meow/json/Wonder Boy Parth-Tamil.json",
    "/meow/json/Wonder Boy Parth-Telugu.json",
    "/meow/json/Yama Ling - Tamil-Tamil.json",
    "/meow/json/Yes Mr. CEO, We Have A Baby-English.json",
    "/meow/json/Yes Mr. CEO, We Have A Baby-Hindi.json",
    "/meow/json/Yes Mr. CEO, We Have A Baby-Kannada.json",
    "/meow/json/Yes Mr. CEO, We Have A Baby-Malayalam.json",
    "/meow/json/Yes Mr. CEO, We Have A Baby-Telugu.json",
    "/meow/json/You Are like The Wind Passing By My Pillow-Hindi.json",
    "/meow/json/You Are like the Wind Passing by My Pillow-Malayalam.json",
    "/meow/json/You Are like the Wind Passing by My Pillow-Tamil.json",
    "/meow/json/You Are like the Wind Passing by My Pillow-Telugu.json",
  'https://cdn.jsdelivr.net/npm/hls.js@latest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Dynamic cache patterns
const CACHE_PATTERNS = {
  json: /\.json$/,
  images: /\.(jpg|jpeg|png|gif|webp|svg)$/,
  fonts: /\.(woff|woff2|ttf|eot)$/,
  videos: /\.(mp4|webm|m3u8|ts)$/
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('kukufm-') && 
                     cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE;
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
    .then(() => {
      console.log('[SW] Service worker activated and ready');
      // Notify all clients about the update
      return self.clients.matchAll();
    })
    .then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_ACTIVATED',
          message: 'Service worker updated successfully'
        });
      });
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

// Handle fetch requests with appropriate caching strategy
async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Static assets - Cache First
    if (isStaticAsset(request)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
	
	/*
    if (CACHE_PATTERNS.json.test(url.pathname)) {
      return await networkFirstWithUpdate(request, DYNAMIC_CACHE);
    } */
	
	// Strategy 2: JSON files - Network First with fallback
	if (CACHE_PATTERNS.json.test(url.pathname)) {
	  return await cacheFirst(request, DYNAMIC_CACHE); 
	}


    // Strategy 3: Images - Cache First with network fallback
    if (CACHE_PATTERNS.images.test(url.pathname)) {
      return await cacheFirst(request, DYNAMIC_CACHE);
    }

    // Strategy 4: Fonts - Cache First
    if (CACHE_PATTERNS.fonts.test(url.pathname) || url.hostname.includes('googleapis') || url.hostname.includes('gstatic')) {
      return await cacheFirst(request, STATIC_CACHE);
    }

    // Strategy 5: Video streams - Network only (don't cache)
    if (CACHE_PATTERNS.videos.test(url.pathname) || url.pathname.includes('.m3u8') || url.pathname.includes('.ts')) {
      return await networkOnly(request);
    }

    // Strategy 6: Same origin - Network First
    if (url.origin === self.location.origin) {
      return await networkFirstWithUpdate(request, DYNAMIC_CACHE);
    }

    // Strategy 7: External resources - Network First
    return await networkFirst(request, DYNAMIC_CACHE);

  } catch (error) {
    console.error('[SW] Fetch error:', error);
    
    // Return offline fallback if available
    if (url.origin === self.location.origin) {
      const cache = await caches.open(STATIC_CACHE);
      const cachedResponse = await cache.match('/index.html');
      return cachedResponse || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Check if request is for static assets
function isStaticAsset(request) {
  const url = new URL(request.url);
  return STATIC_ASSETS.some(asset => {
    if (typeof asset === 'string') {
      return url.pathname === asset || url.href === asset;
    }
    return false;
  });
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Update cache in background if it's old
    updateCacheInBackground(request, cache);
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network First with Update Strategy
async function networkFirstWithUpdate(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      
      // Notify clients about updated content
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'CONTENT_UPDATED',
          url: request.url
        });
      });
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network Only Strategy
async function networkOnly(request) {
  return await fetch(request);
}

// Update cache in background
async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse);
    }
  } catch (error) {
    console.log('[SW] Background update failed:', error);
  }
}

// Handle messages from clients
self.addEventListener('message', event => {
  const { type, data } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CHECK_UPDATE':
      checkForUpdates();
      break;
      
    case 'CLEAR_CACHE':
      clearCache(data?.cacheName);
      break;
      
    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0].postMessage(info);
      });
      break;
  }
});

// Check for updates periodically
let updateCheckInterval;

function startUpdateCheck() {
  updateCheckInterval = setInterval(() => {
    checkForUpdates();
  }, UPDATE_CHECK_INTERVAL);
}

function stopUpdateCheck() {
  if (updateCheckInterval) {
    clearInterval(updateCheckInterval);
    updateCheckInterval = null;
  }
}

async function checkForUpdates() {
  try {
    const registration = await self.registration;
    await registration.update();
  } catch (error) {
    console.log('[SW] Update check failed:', error);
  }
}

// Clear specific cache
async function clearCache(cacheName) {
  if (cacheName) {
    await caches.delete(cacheName);
  } else {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(name => name.startsWith('kukufm-'))
        .map(name => caches.delete(name))
    );
  }
}

// Get cache information
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {};
  
  for (const cacheName of cacheNames) {
    if (cacheName.startsWith('kukufm-')) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      info[cacheName] = {
        size: keys.length,
        urls: keys.map(req => req.url)
      };
    }
  }
  
  return info;
}

// Start periodic update checks
startUpdateCheck();

// Background sync for failed requests (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
      event.waitUntil(doBackgroundSync());
    }
  });
}

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('[SW] Background sync triggered');
}

// Push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      actions: data.actions,
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    self.clients.matchAll().then(clients => {
      if (clients.length > 0) {
        return clients[0].focus();
      }
      return self.clients.openWindow('/');
    })
  );
});

console.log('[SW] Service worker script loaded');