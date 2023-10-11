let express = require('express');
import { MongoClient, ObjectId } from 'mongodb';
import * as winston from 'winston';
import { Authentication } from './authentication';

import * as mongo from 'mongodb';

import authRouter from './controllers/auth';
import collectionRouter from './controllers/collection';
import processRouter from './controllers/process';
import usersRouter from './controllers/users';
import groupsRouter from './controllers/groups';
import contactsRouter from './controllers/contacts';
import peopleRouter from './controllers/people';
import membershipsRouter from './controllers/memberships';
import pluginsRouter from './controllers/plugins';
import userPluginsRouter from './controllers/user-plugins';
import knowledgeSetsRouter from './controllers/knowledge-sets';

//import { default as articleTitle } from 'article-title';

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'cage-server' },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});


var bodyParser = require('body-parser')

const app = express();

app.locals.logger = logger;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.use('/api', authRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/processes', processRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/people', peopleRouter);
app.use('/api/memberships', membershipsRouter);
app.use('/api/plugins', pluginsRouter);
app.use('/api/knowledgesets', knowledgeSetsRouter);
app.use('/api/user/plugins', userPluginsRouter);

/*app.post('/api/plugins', (req, res) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let plugin = req.body;

        plugin.user = new mongo.ObjectID(legit.id);
    
        db.collection('plugins').insert(plugin);

        res.send(plugin);
    }
});*/

app.post('/api/load-plugin', async (req: any, res: any) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let src = req.body.src + '/plugin.json';

        const got = require('got');

        let response = await got(src);

        let plugin = JSON.parse(response.body);

        plugin.user = new mongo.ObjectID(legit.id);
        plugin.src = src;
        
        db.collection('plugins').insert(plugin);
        res.json(plugin);
    }
});

app.post('/api/user/load-plugin', async (req: any, res: any) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;

        let src = req.body.src;
        let pluginJsonSrc = src + '/plugin.json';

        const got = require('got');

        let response = await got(pluginJsonSrc);

        let plugin = JSON.parse(response.body);

        plugin.user = new mongo.ObjectID(legit.id);
        plugin.type = 'CUSTOM';
        plugin.src = src;
        
        //db.collection('plugins').insert(plugin);
        db.collection('users').updateOne({ _id: new mongo.ObjectID(legit.id) }, { $push: { plugins: plugin }});

        res.json(plugin);
    }
});

app.get('/api/odf', (req: any, res: any) => {
    let data = [];
    if (req.body && req.body.data) {
        data = req.body.data;
    } else {
        data = [
            'Sir Ernest Henry Shackleton',
            '15 February 1874 5 January 1922 ) was an Anglo-Irish Antarctic explorer who led three British expeditions to the Antarctic .',
            'He was one of the principal figures of the period known as the Heroic Age of Antarctic Exploration',
            'Shackleton s first experience of the polar regions was as third officer on Captain Robert Falcon Scott s Discovery expedition of 1901 1904 , from which he was sent home early on health grounds , after he and his companions Scott and Edward Adrian Wilson set a new southern record by marching to latitude 82 S. During the Nimrod expedition of 1907 1909 , he and three companions established a new record Farthest South latitude at 88 S , only 97 geographical miles ( 112 statute miles or 180 kilometres ) from the South Pole , the largest advance to the pole in exploration history .',
            'Also , members of his team climbed Mount Erebus , the most active Antarctic volcano .',
            'For these achievements , Shackleton was knighted by King Edward VII on his return home .',
            'After the race to the South Pole ended in December 1911 , with Roald Amundsen s conquest , Shackleton turned his attention to the crossing of Antarctica from sea to sea , via the pole .',
            'To this end , he made preparations for what became the Imperial Trans-Antarctic Expedition , 1914 1917 .',
            'Disaster struck this expedition when its ship , Endurance , became trapped in pack ice and was slowly crushed before the shore parties could be landed .',
            'The crew escaped by camping on the sea ice until it disintegrated , then by launching the lifeboats to reach Elephant Island and ultimately South Georgia Island , a stormy ocean voyage of 720 nautical miles ( 1,330 km .',
            '830 mi ) and Shackleton s most famous exploit . .',
            'In 1921 , he returned to the Antarctic with the Shackleton Rowett Expedition , but died of a heart attack while his ship was moored in South Georgia .',
            'At his wife s request , he was buried there .',
            'Away from his expeditions , Shackleton s life was generally restless and unfulfilled .',
            'In his search for rapid pathways to wealth and security , he launched business ventures which failed to prosper , and he died heavily in debt .',
            'Upon his death , he was lauded in the press but was thereafter largely forgotten , while the heroic reputation of his rival Scott was sustained for many decades .',
            'Later in the 20th century , Shackleton was " rediscovered " . [ 1 ]',
            'He rapidly became a role model for leadership as one who , in extreme circumstances , kept his team together in a survival story described by cultural historian Stephanie Barczewski as " incredible " . [ 2 ]',
            'In his 1956 address to the British Science Association , Sir Raymond Priestley , one of his contemporaries , said " Scott for scientific method , Amundsen for speed and efficiency but when disaster strikes and all hope is gone , get down on your knees and pray for Shackleton " , paraphrasing what Apsley Cherry-Garrard had written in a preface to his 1922 memoir The Worst Journey in the Worl .',
            'In 2002 , Shackleton was voted eleventh in a BBC poll of the 100 Greatest Britons.Shackleton was born on 15 February 1874, in Kilkea, County Kildare, Irelan .',
            'His father , Henry Shackleton , tried to enter the army , but his poor health prevented him from doing so .'
        ];
        /*He became a farmer instead , settling in Kilkea .
        The Shackleton family are of English origin , specifically from Yorkshire .
        Abraham Shackleton , an English Quaker , moved to Ireland in 1726 and started a school at Ballitore , County Kildare .
        Shackleton s mother , Henrietta Letitia Sophia Gavan , was descended from the Fitzmaurice family . [ 3 ]
        Ernest was the second of their ten children and the first of two sons .
        The second , Frank , achieved notoriety as a suspect , later exonerated , in the 1907 theft of the Irish Crown Jewels . [ 4 ] .
        In 1880 , when Ernest was six , Henry Shackleton gave up his life as a landowner to study medicine at Trinity College , Dublin , moving his family to the city . [ 5 ]
        Four years later , the family moved again , from Ireland to Sydenham in suburban Londo .
        Partly this was in search of better professional prospects for the newly qualified doctor , but another factor may have been unease about their Anglo-Irish ancestry , following the assassination by Irish nationalists of Lord Frederick Cavendish , the British Secretary for Ireland , in 1882 . [ 5 ]
        However , Shackleton took lifelong pride in his Irish roots , and frequently declared , " I am an Irishman " . [ 6 ]
        Education From early childhood , Shackleton was a voracious reader , a pursuit which sparked a passion for adventure . [ 7 ]
        He was schooled by a governess until the age of eleven , when he began at Fir Lodge Preparatory School in West Hill , Dulwich , in southeast Londo .
        At the age of thirteen , he entered Dulwich College . [ 5 ]
        The young Shackleton did not particularly distinguish himself as a scholar , and was said to be " bored " by his studies . [ 5 ]
        He was quoted later as saying : " I never learned much geography at school . .
        In his final term at the school he was still able to achieve fifth place in his class of thirty-one . [ 8 ]
        Merchant Navy officer Shackleton s restlessness at school was such that he was allowed to leave at 16 and go to sea . [ 9 ]
        The options available were a Royal Navy cadetship at Britannia , which Shackleton could not afford .
        The mercantile marine cadet ships Worcester and Conway .
        Or an apprenticeship " before the mast " on a sailing vesse . .
        The third option was chosen . [ 9 ]
        His father was able to secure him a berth with the North Western Shipping Company , aboard the square-rigged sailing ship Hoghton Tower . [ 9 ]
        During the following four years at sea , Shackleton learned his trade , visiting the far corners of the earth and forming acquaintances with a variety of people from many walks of life , learning to be at home with all kinds of men . [ 10 ]
        In August 1894 , he passed his examination for second mate and accepted a post as third officer on a tramp steamer of the Welsh Shire Line . [ 10 ]
        Two years later , he had obtained his first mate s ticket , and in 1898 , he was certified as a master mariner , qualifying him to command a British ship anywhere in the world [ 10
        In 1898 , Shackleton joined Union-Castle Line , the regular mail and passenger carrier between Southampton and Cape Town .
        He was , as a shipmate recorded , " a departure from our usual type of young officer " , content with his own company though not aloof , " spouting lines from Keats [ and ]
        Following the outbreak of the Boer War in 1899 , Shackleton transferred to the troopship Tintagel Castle where , in March 1900 , he met an army lieutenant , Cedric Longstaff , whose father Llewellyn W. Longstaff was the main financial backer of the National Antarctic Expedition then being organised in London . [ 12 ]
        Shackleton used his acquaintance with the son to obtain an interview with Longstaff senior , with a view to obtaining a place on the expeditio .
        Longstaff , impressed by Shackleton s keenness , recommended him to Sir Clements Markham , the expedition s overlord , making it clear that he wanted Shackleton accepted . [ 12 ]
        On 17 February 1901 , his appointment as third officer to the expedition s ship Discovery was confirmed .
        On 4 June he was commissioned into the Royal Navy , with the rank of sub-lieutenant in the Royal Naval Reserve . [ 13 ] [ 14 ]
        Although officially on leave from Union-Castle , this was in fact the end of Shackleton s Merchant Navy service . [ 12 ] .
        Discovery expedition , 1901 1903 The British National Antarctic Expedition , known as the Discovery expedition after the ship Discovery , was the brainchild of Sir Clements Markham , president of the Royal Geographical Society , and had been many years in preparatio .
        It was led by Robert Falcon Scott , a Royal Navy torpedo lieutenant lately promoted commander , [ 15 ] and had objectives that included scientific and geographical discovery . [ 16 ]
        Although Discovery was not a Royal Navy unit , Scott required the crew , officers and scientific staff to submit to the conditions of the Naval Discipline Act , and the ship and expedition were run on Royal Navy lines . [ 17 ]
        Shackleton accepted this , even though his own background and instincts favoured a different , more informal style of leadership . [ 18 ]
        Shackleton s particular duties were listed as : " In charge of seawater analysi .
        Discovery departed London on 31 July 1901 , arriving at the Antarctic coast , via Cape Town and New Zealand , on 8 January 190 .
        After landing , Shackleton took part in an experimental balloon flight on 4 February . [ 20 ]
        He also participated , with the scientists Edward Adrian Wilson and Hartley Ferrar , in the first sledging trip from the expedition s winter quarters in McMurdo Sound , a journey which established a safe route on to the Great Ice Barrier . [ 21 ]
        During the Antarctic winter of 1902 , in the confines of the iced-in Discovery , Shackleton edited the expedition s magazine The South Polar Times . [ 22 ]
        According to steward Clarence Hare , he was " the most popular of the officers among the crew , being a good mixer " , [ 23 ] though claims that this represented an unofficial rival leadership to Scott s are unsupported . [ 24 ]
        Scott chose Shackleton to accompany Wilson and himself on the expedition s southern journey , a march southwards to achieve the highest possible latitude in the direction of the South Pol .
        This march was not a serious attempt on the Pole , although the attainment of a high latitude was of great importance to Scott , and the inclusion of Shackleton indicated a high degree of personal trust . [ 24 ] [ 25 ]
        The party set out on 2 November 1902 .
        The march was , Scott wrote later , " a combination of success and failure " . [ 26 ]
        A record Farthest South latitude of 82 17 was reached , beating the previous record established in 1900 by Carsten Borchgrevink . [ a ] [ 27 ]
        The journey was marred by the poor performance of the dogs , whose food had become tainted , and who rapidly fell sick . [ 28 ]
        All 22 dogs died during the march .
        The three men all suffered at times from snow blindness , frostbite and , ultimately , scurvy .
        On the return journey , Shackleton had by his own admission " broken down " and could no longer carry out his share of the work . [ 29 ]
        He later denied Scott s claim in The Voyage of the Discovery , that he had been carried on the sledge . [ 30 ]
        He was in a seriously weakened condition .
        Wilson s diary entry for 14 January reads : " Shackleton has been anything but up to the mark , and today he is decidedly worse , very short winded and coughing constantly , with more serious symptoms that need not be detailed here but which are of no small consequence one hundred and sixty miles from the ship .
        One does not believe that we have lost all sense of admiration for courage [ and ] endurance " . [ 65 ]
        Chiefly alcohol , Boss , " replied Macklin .
        His people-centred approach to leadership can be a guide to anyone in a position of authority " . [ 142 ]
        For a Winter Journey , Wilson .
        For a dash to the Pole and nothing else , Amundsen : and if I am in the devil of a hole and want to get out of it , give me Shackleton every time " . [ 146 ] .
        Sailing from Elephant Island to South Georgia , and the crossing of the South Georgian mountains from King Haakon Bay ( where Shackleton had landed nearly 100 years prior ) to Stromness . [ 153 ] [ 154 ] .
        The expedition very carefully matched legacy conditions , using a replica of the James Caird ( named for the project s patron : the Alexandra Shackleton ) , period clothing ( by Burberry ) , replica rations ( both in calorific content and rough constitution ) , period navigational aids , and a Thomas Mercer chronometer just as Shackleton had used . [ 155 ]
        This expedition was made into a documentary film , [ 156 ] screening as Chasing Shackleton on PBS in the United States , and Shackleton : Death or Glory elsewhere on the Discovery Channel [ 157
        In 2016 a statue of Shackleton by Mark Richards was erected in Athy , sponsored by Kildare County Council . [ 158 ] [ 159 ]
        In 2017 , the musical play Ernest Shackleton Loves Me by Val Vigoda and Joe DiPietro made its debut in New York City at the Tony Kiser Theater , an Off-Broadway venue . [ 160 ]
        Blended with a parallel story of a struggling composer , the play retells the adventure of*/
    }
    const simpleOdf = require('simple-odf');
    const document = new simpleOdf.TextDocument();
    const body = document.getBody();
    
    body.addHeading('Notes');
    for (let dataItem of data) {
        body.addParagraph(dataItem);
    }
    
    res.set({"Content-Disposition":"attachment; filename=\"export.odf\""});
    res.send(document.toString());
    //document.saveFlat('/home/homer/Welcome.fodf');
});

app.post('/api/odf', (req: any, res: any) => {
    let legit = Authentication.authentication(req);

    if (legit) {
        let db = req.app.locals.db;


        if (req.body && req.body.data) {
            let data: any = {};
            data.user = new mongo.ObjectID(legit.id);
            data.data = req.body.data;
            
            db.collection('exports').insert(data);
            data.id = data._id;
            delete data._id;

            res.json(data);
        }
    }
});

app.get('/api/odf/:id', (req: any, res: any) => {
    let id = req.params.id;
    
    let db = req.app.locals.db;

    db.collection('exports').findOne({_id: new mongo.ObjectID(id) }, (err: any, data: any) => {
        let items = data.data;

        const simpleOdf = require('simple-odf');
        const document = new simpleOdf.TextDocument();
        const body = document.getBody();
        
        body.addHeading('Notes');
        for (let item of items) {
            body.addParagraph(item);
        }
        
        res.set({"Content-Disposition":"attachment; filename=\"export.odf\""});
        res.send(document.toString());
    });
});

var dbHost = process.env.HOST || '127.0.0.1';
var dbPort = process.env.PORT || 27017;
var dbName = process.env.DATABASE || 'opencage';
var dbURL = process.env.DB || "mongodb://" + dbHost + ":" + dbPort + "/" + dbName;
var port = process.env.PORT || 3000;

logger.info('DB connection string is ' + dbURL);
MongoClient.connect(dbURL, (err, client) => {
    if (err) return console.log(err)
    let db = client.db();
    app.locals.db = db;
    app.listen(port, () => {
        console.log('The application is listening on port ' + port + '!');
    })
});

function decodedText(decodedText: any) {
    throw new Error('Function not implemented.');
}


