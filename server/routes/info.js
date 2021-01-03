const router = require("express").Router();
const rateLimiter = require("express-rate-limit");
const profileModel = require("../models/profile");

const infoRateLimiter = rateLimiter({   // may reset after server restart
    windowMs: 30*60000, // 30 minutes
    max: 500    // 1k req per hour
});

router.use(infoRateLimiter);

/**
 * @brief - Gets all user records
 * 
 * @request body -> It may contain the filters
 *              {
 *                  // optional
 *                  filters: [{key: count, con: >=, val: 45}, {...}, {...}]
 *              }
 * 
 * @response - 200 When successfull
 *             429 - Limit reached
 *             500 When server error
 * 
 * @note - Incorrect/Additional filters will simply be ignored
 */
router.get("/profiles", (req, res) => {
    const where = {};   // the queries

    if( req.body.filters && Array.isArray( req.body.filters ) ) {
        req.body.filters.forEach(filter => {
            switch (filter.key) {
                case 'name':
                    where['name'] = RegExp(`/${filter.val}/i`)    // only single condition supported for names and location field
                    break;
                case 'screen_name':
                    where['screen_name'] = RegExp(`/${filter.val}/i`)
                    break;
                case 'location':
                    where['location'] = RegExp(`/${filter.val}/i`)
                    break;
                case 'followers_count':
                    if( filter.con === '>=' ) where['followers_count']['$gte'] = filter.val
                    else if( filter.con === '<=' ) where['followers_count']['$lte'] = filter.val
                    break;
                case 'following_count':
                    if( filter.con === '>=' ) where['following_count']['$gte'] = filter.val
                    else if( filter.con === '<=' ) where['following_count']['$lte'] = filter.val
                    break;
                case 'verified':
                    filter.val === filter.val === 'false' ? false : true;   // expecting that IF key is present, IT MUST be having a value (filter.val)
                    where['verified'] = filter.val;
                    break;
            }
        });
    }

    profileModel.find(where)
                .lean()
                .then(docs => {
                    res.json(docs);
                })
                .catch(err => {
                    console.error("⭕Database Read failure⭕", err);

                    res.sendStatus(500);
                })
})

module.exports = router;
