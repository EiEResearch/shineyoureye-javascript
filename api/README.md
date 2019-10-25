## SYE REST Web Service
version Release 1.0.0

### Table of Contents

 1. Purpose
 2. REST JSON Web Service
	 i. Authentication
	 ii. Procedures
 3. API Procedures
	 i. posts
	 ii. events
	 iii. info
 4. Change Log

#### 1. Purpose
The purpose of this service is to describe the technical specifications of how 3rd Party Systems should consume the SYE web service which will allow these systems access to exposed functionaltiy

#### 2. REST JSON Web Service
This is a REST based JSON web service.

**Development**
| Method |  |
|--|--|
| Base URL | http://localhost:3000/api/{procedure}  |

**Production**
| Method |  |
|--|--|
| Base URL | http://shineyoureye.org/api/{procedure}  |


##### 2.1. Authentication
This service does not use any authorization.

##### 2.2. Procedures
Procedures are invoked using a REST structure. As such please ensure you are using the correct HTTP method (GET, POST, DELETE, etc) success

Along with the appropriate HTTP response code, each JSON response will have a 'success' key (bool) to define if the call was successful or not. Successful calls will have a 'data' key with the response data. 

Unsuccessful calls will have an 'error' key with the error response data. This data will have a 'message' key to define the type of error and will also have a 'code' key to define the status of the error.

#### 3. Procedures
This section defines the available Procedures

Available Endpoints
|METHOD | URL | Optional Parameters
|--|--|--|
|GET | /posts | sort, limit, page |
|GET | /posts/{slug} | |
|GET | /events | sort, limit, page |
|GET | /events/{slug} | |
|GET | /info/{slug} | |

##### 3.1   posts
Retrieves a paginated list of blog posts

**Details**
| Method | URL |
|--|--|
| GET | /posts |
| Optional Parameters | sort, limit, page |

Remember to URL encode your parameter strings.

Sample GET request
```
    - Posts
    /posts
```   

Sample response
```json
    {
    "success": true,
    "message": "data found",
    "data": {
        "sort": "desc",
        "posts": [
            {
                "title": "SYE Week in Review, August 2",
                "slug": "sye-week-in-review-august-2",
                "published": true,
                "featured": false,
                "eventDate": null,
                "date": "August 6, 2019",
                "url": "/blog/sye-week-in-review-august-2",
                "excerpt": "",
                "author": "EiENigeria",
                "body": "<p><img src=\"/media/prose-images/SYE%20Week%20in%20Review,%20August%202.jpg\" alt=\"SYE Week in Review, August 2.jpg\" /></p>",
                "type": "image"
            },
            {
                "title": "Buhari's ministerial list: Issues and Matters Arising!",
                "slug": "buhari-s-ministerial-list-issues-and-matters-arising",
                "published": true,
                "featured": false,
                "eventDate": null,
                "date": "August 3, 2019",
                "url": "/blog/buhari-s-ministerial-list-issues-and-matters-arising",
                "excerpt": "52 days after he was sworn-in, President Muhammadu Buhari last week submitted the much-awaited ministerial nominees list to...",
                "author": "EiENigeria",
                "body": "<p>52 days after he was sworn-in, President Muhammadu Buhari last week submitted the much-awaited ministerial nominees list to the Senate for consideration and confirmation. The team is made up of 43 names, 14 of them former ministers in his first term.</p>\n<p>To get him to release the names was like pulling the chestnuts out of the fire. The Senate had met him earlier in the month on the matter; and later reminded him of the need to submit the list before July 26th or wait until its members returned from their annual vacation in September. During their engagement, the President revealed being under pressure. He justified his delay on the grounds that he did not want to repeat the mistake of his first term, when he picked mostly people the party and individuals recommended to him.</p>\n<p>With his “Next Level” agenda, therefore, he pleaded for more time to enable him to recruit only those with the capacity to deliver. But this time he said, “I am going to be quite me; me in the sense that I will pick people I know personally.”  However, most of the faces he unfurled are familiar; none of them came from the moon as to justify his purported thoroughness.</p>\n<p>The task of choosing ministers is not rocket science. Buhari’s lumbering approach to governance rankles, viewed against the background of the speed of light with which global leaders respond to similar responsibilities. </p>\n<p>For instance, the new United Kingdom Prime Minister, Boris Johnson, who just took over from Theresa May, promptly picked his cabinet the same day. Ending his speech after he defeated Jeremy Hunt to emerge as leader of the Conservative Party, Johnson declared, “Today, the campaign is over and the work begins.” According to The Sun of London, he spent the next 24 hours locked away with aides gathering a “Cabinet for Modern Britain,” which will deliver Brexit and his domestic policies.</p>\n<p>Not with Buhari. Here, a ministerial list that took five months to compile is thin on acclaimed technocrats or policy wonks. It comprises some allegedly recycled corrupt politicians, many of whom failed woefully in their previous public offices; further putting his commitment to uprooting corruption and uplifting the economy into question. The team, which the Senate began screening already, does not command public confidence.</p>\n<p>The President, as usual, did not attach portfolios to the nominees. It is a discredited practice that makes a mockery of ministerial screening in the country, as it gives no room for ascertaining their competence or suitability. It is hypocritical that Buhari, with his preachment of “not business as usual,” still embraces this old order, which has short-changed the country in terms of service delivery. That the constitution does not prescribe attachment of portfolios does not mean it cannot be done. It does not breach any law. The Senate, which vowed to improve on the performance of the Eighth Senate, has failed its first litmus <br />\ntest, by accepting this and the banality of “bow and go” by 20 ministerial nominees.</p>\n<p>However, many were not shocked by Buhari’s delay as it took him much longer in his first term to form his cabinet. But given his assurances, the quality of the team assembled should have compensated for time wasted. Unfortunately, it did not happen, again. The capacity for them to push the agenda for development for Nigeria is very much in doubt. Nigeria is seeing a President who is so widely unable to fulfil his responsibilities.</p>\n<p>Consequently, the fear that the economy might not be free from its fetters in Buhari’s second term with his present recruits is not unfounded.</p>",
                "type": "article"
            }
        ],
        "pagination": {
            "perPage": 10,
            "totalPages": 30,
            "previousPage": 0,
            "nextPage": 2,
            "currentPage": 1,
            "totalEntries": 344
        }
	  }
    }
```
   
Sample GET request with parameters
```
    - Posts with parameters
    /posts?page=160&limit=2&sort=asc
```

Sample response
```json    
    {
    "success": true,
    "message": "data found",
    "data": {
        "sort": "asc",
        "posts": [
            {
                "title": "SYE Week in Review, June 7, 2019",
                "slug": "sye-week-in-review-june-7-2019",
                "published": true,
                "featured": false,
                "eventDate": null,
                "date": "June 14, 2019",
                "url": "/blog/sye-week-in-review-june-7-2019",
                "excerpt": "",
                "author": "EiENigeria",
                "body": "<p><img src=\"/media/prose-images/SYE%20Weekly%20Review,%20June%207.jpg\" alt=\"SYE Week in Review, June 7.jpg\" /></p>",
                "type": "image"
            },
            {
                "title": "The 9th National Assembly and its leadership tussle: Matters Arising!",
                "slug": "the-9th-national-assembly-and-its-leadership-tussle-matters-arising",
                "published": true,
                "featured": false,
                "eventDate": null,
                "date": "June 14, 2019",
                "url": "/blog/the-9th-national-assembly-and-its-leadership-tussle-matters-arising",
                "excerpt": "The 9th National Assembly of the Federal Republic of Nigeria was inaugurated on June 11, 2019; the assembly...",
                "author": "EiENigeria",
                "body": "<p>The 9th National Assembly of the Federal Republic of Nigeria was inaugurated on June 11, 2019; the assembly will run its course till June 11, 2023.</p>\n<p>Senator Ahmed Lawan, from Yobe, on Tuesday, June 11, emerged the new Senate President when he polled 79 votes to defeat his only contender, Sen. Ali Ndume, from Borno, who scored 28 votes.</p>\n<p>The House of Representatives also elected Mr Femi Gbajabiamila (APC-Lagos), as the speaker of the 9th House of Representatives when he polled 281 votes against Umar Bago, who got 76.</p>\n<p>After all the hullabaloo, the ruling All Progressives Congress (APC) got what it wanted in terms of the calibre of persons to occupy the seats of principal officers of the National Assembly.</p>\n<p>However, apprehensions have been rife among Nigerians that by allowing the presidency to have its way in the selection of the principal officers, the ability of the upper chamber of the legislature to perform its constitutional role of providing checks and balances to the executive has been circumscribed.</p>\n<p>Nonetheless, the election of Senator Ahmed Lawan as the 14th Senate President, which came as a kind of indemnity to the party over its loss in 2015, also subtly stoked recollections about the emergence Dr. Bukola Saraki as the president of the 8th Senate.</p>\n<p>Against the background of those considerations, the question on the minds of Nigerians is, what kind of Senate would the 9th session witness in terms of relationship with the executive, among members as well as legislative processes.</p>\n<p>Would both Senator Lawan as Senate President and Gbajabiamila as the Speaker of the 9th National Assembly embark on a programme of witch-hunt against all those that sided Saraki and Dogora to deny both of them the office in the just concluded 8th National Assembly? How far would the new leadership fare in averting recriminations over the sharing of committees’ chairmanship?</p>\n<p>Although it was obvious that pro-Saraki Senators in the 9th Senate voted against Lawan given the number with which he defeated Senator Ali Ndume, there are still fears that some sort of vengeance could be in the offing against those that supported Saraki.</p>\n<p>Senator Ahmad Ibrahim Lawan comes off as a seasoned educator and an experienced legislator with over 20 years’ service in both lower and upper legislative chambers. As President of the 9th National Assembly, therefore, it could be rightly said that Lawan bears the legislative history of 20 years of Nigeria’s current democratic experience.</p>",
                "type": "article"
            }
        ],
        "pagination": {
            "perPage": 2,
            "totalPages": 172,
            "previousPage": 159,
            "nextPage": 161,
            "currentPage": 160,
            "totalEntries": 344
        }
      }
    }
```
Sample GET error request
```
    - Posts with parameters
    /posts?page=1900&limit=2000&sort=asc
```
Sample Error Response
```json
    {
    "error": {
        "message": "Sorry, no content matched your criteria.",
        "code": 404,
        "details": {
            "page": "190",
            "limit": "2",
            "sort": "asc"
        },
        "target": "/api/posts"
      }
    }
```

##### 3.2   posts/{slug}
Retrieves a single blog post when slug is provided

**Details**
| Method | URL |
|--|--|
| GET | /posts/{slug}|

Sample GET request
```
    - Single Post
    /posts/sye-week-in-review-august-30
```
Sample response
```json
    {
    "success": true,
    "message": "data found",
    "data": {
        "post": {
            "title": "SYE Week in Review, August 30",
            "slug": "sye-week-in-review-august-30",
            "published": true,
            "featured": false,
            "eventDate": null,
            "date": "September 4, 2019",
            "url": "/blog/sye-week-in-review-august-30",
            "excerpt": "",
            "author": "EiENigeria",
            "body": "<p><img src=\"/media/prose-images/SYE%20Week%20in%20Review,%20August%2030.jpg\" alt=\"SYE Week in Review, August 30.jpg\" /></p>",
            "type": "image"
        }
      }
    }
```
Sample GET error request
```
    - Single Post
    /posts/sye-week-in-review-august-301
```
Sample error response
```json
    {
    "error": {
        "message": "No post matched sye-week-in-review-august-301",
        "code": 404,
        "details": {
            "slug": "sye-week-in-review-august-301"
        },
        "target": "/api/posts/sye-week-in-review-august-301"
      }
    }
```

##### 3.3   events
Retrieves a paginated list of events

**Details**
| Method | URL |
|--|--|
| GET | /events|
| Optional Parameters | sort, limit, page |

Remember to URL encode your parameter strings.

Sample GET request
```
    - Events
    /events
```
Sample response

```json   
    {
    "success": true,
    "message": "data found",
    "data": {
        "sort": "desc",
        "posts": [
            {
                "title": "Ordinary Citizens Doing Extraordinary Things",
                "slug": "ordinary-citizens-doing-extraordinary-things",
                "published": true,
                "featured": false,
                "eventDate": "Thursday, June 27, 2019, 5:30 PM South Africa Standard Time",
                "date": "June 24, 2019",
                "url": "/events/ordinary-citizens-doing-extraordinary-things",
                "excerpt": "",
                "author": "EiENigeria",
                "body": "<p><img src=\"/media/prose-images/Ordinary%20Citizens%20Doing%20Extraordinary%20Things.jpg%20=800x\" alt=\"Ordinary Citizens Doing Extraordinary Things.jpg\" /></p>",
                "type": "image",
                "isActive": false
            },
            {
                "title": "Musical Concert for Active Citizens",
                "slug": "musical-concert-for-active-citizens",
                "published": true,
                "featured": false,
                "eventDate": "Friday, September 8, 2017, 9:57 PM South Africa Standard Time",
                "date": "August 31, 2017",
                "url": "/events/musical-concert-for-active-citizens",
                "excerpt": "",
                "author": "EiENigeria",
                "body": "<p><img src=\"/media/prose-images/pic.jpeg\" alt=\"pic.jpeg\" /></p>",
                "type": "image",
                "isActive": false
            }
        ],
        "pagination": {
            "perPage": 10,
            "totalPages": 3,
            "previousPage": 0,
            "nextPage": 2,
            "currentPage": 1,
            "totalEntries": 5
        }
     }
    }
```
Sample GET request
```
    - Events with parameters
    /events?page=2&limit=2&sort=asc
```
Sample response
```json    
    {
    "success": true,
    "message": "data found",
    "data": {
        "sort": "asc",
        "posts": [
            {
                "title": "Party Politics 101: The Good, Bad & Ugly",
                "slug": "party-politics-101-the-good-bad-ugly",
                "published": true,
                "featured": false,
                "eventDate": "Saturday, July 8, 2017, 12:00 PM South Africa Standard Time",
                "date": "June 21, 2017",
                "url": "/events/party-politics-101-the-good-bad-ugly",
                "excerpt": "",
                "author": "EiENigeria",
                "body": "<p><img src=\"/media/prose-images/PartyPolitics-The%20Good,Bad%20&%20Ugly.jpeg\" alt=\"Party Politics 101: The Good, Bad & Ugly\" /></p>",
                "type": "image",
                "isActive": false
            }
        ],
        "pagination": {
            "perPage": 1,
            "totalPages": 5,
            "previousPage": 1,
            "nextPage": 3,
            "currentPage": 2,
            "totalEntries": 5
        }
      }
    }
```
Sample GET error request

    - Events
    /events?page=20&limit=2&sort=asc

Sample error response
```json
    {
    "error": {
        "message": "Sorry, no content matched your criteria.",
        "code": 404,
        "details": {
            "page": "20",
            "limit": "2",
            "sort": "asc"
        },
        "target": "/api/events"
      }
    }
```
##### 3.4   events/{slug}
Retrieves a single event when slug is provided

**Details**
| Method | URL |
|--|--|
| GET | /events/{slug}|

Sample GET request
```
    - Single Post
    /events/ordinary-citizens-doing-extraordinary-things
```
Sample response
```json
    {
    "success": true,
    "message": "data found",
    "data": {
        "post": {
            "title": "Ordinary Citizens Doing Extraordinary Things",
            "slug": "ordinary-citizens-doing-extraordinary-things",
            "published": true,
            "featured": false,
            "eventDate": "Thursday, June 27, 2019, 5:30 PM South Africa Standard Time",
            "date": "June 24, 2019",
            "url": "/events/ordinary-citizens-doing-extraordinary-things",
            "excerpt": "",
            "author": "EiENigeria",
            "body": "<p><img src=\"/media/prose-images/Ordinary%20Citizens%20Doing%20Extraordinary%20Things.jpg%20=800x\" alt=\"Ordinary Citizens Doing Extraordinary Things.jpg\" /></p>",
            "type": "image",
            "isActive": false
        }
      }
    }
```

Sample GET error request
```
    - Single Post
    /events/sye-week-in-review-august-301
```
Sample error response
```json
    {
    "error": {
        "message": "No post matched sye-week-in-review-august-301",
        "code": 404,
        "details": {
            "slug": "sye-week-in-review-august-301"
        },
        "target": "/api/events/sye-week-in-review-august-301"
      }
    }
```

##### 3.5  info/{slug}
Retrieves a single info document when slug is provided

**Details**
| Method | URL |
|--|--|
| GET | /info/{slug}|

Sample GET request
```
    - Single Info
    /info/about
```
Sample response
```json
    {
        "success": true,
        "message": "data found",
        "data": {
            "post": {
                "title": "About",
                "slug": "about",
                "published": true,
                "featured": false,
                "eventDate": null,
                "date": null,
                "url": "/info/about",
                "excerpt": "Shine your Eye is an initiative...",
                "author": "EiENigeria",
                "body": "<p>Shine your Eye is an initiative of <a href=\"http://www.eienigeria.org\" title=\"EiENigeria\">Enough is Enough Nigeria (EiENigeria)</a> with support from <a href=\"http://www.placng.org\" title=\"PLAC\">Policy and Legal Advocacy Center</a>.</p>\n<p>Shine Your Eye lets you follow the activities of elected officials, connect with them and share your concerns. You can view profiles of elected officials that include such information as educational background, experience, legislative interests, phone numbers and email addresses.</p>\n<p>Our goal is to increase accountability in governance by making it easier for Nigerians to follow the activities of elected officials and connect with them. Curating the activities of elected officials also makes it easier to review track records at election time.</p>\n<p>The site was built by <a href=\"http://www.mysociety.org\" title=\"mySociety\"><strong>mySociety</strong></a> through a grant from the <a href=\"http://www.omidyar.com\" title=\"Omidyar\"><strong>Omidyar Network</strong></a> to provide technical and administrative support drawing on their experience in building sites like <a href=\"http://www.theyworkforyou.com\" title=\"TheyWorkForYou\"><strong>TheyWorkForYou</strong></a> in the UK.</p>\n<h1>Contact</h1>\n<p>To contact us you can use the form <a href=\"/contact/\">here</a>.</p>",
                "type": "article"
            }
        }
    }
```

Sample GET error request
```
    - Single Info
    /info/about-us-chaps
```
Sample error response
```json
    {
        "error": {
            "message": "No document matched about-us",
            "code": 404,
            "details": {
                "slug": "about-us"
            },
            "target": "/api/info/about-us"
        }
    }
```

#### 4. Change Log
2019-10-04
 - Added info method