const router = require("express").Router();
const rateLimiter = require("express-rate-limit");

const infoRateLimiter = rateLimiter({   // may reset after server restart
    windowMs: 30*60000, // 30 minutes
    max: 500    // 1k req per hour
});

router.use(infoRateLimiter);

/**
 * @brief - Gets all user records
 * 
 * @request body -> It will contain the filters
 *              {}
 * 
 * @response - 200 When successfull
 *             429 - Limit reached
 *             500 When server error
 * 
 * @note - Incorrect/Additional filters will simply be ignored
 */
router.get("/users", (req, res) => {

})

module.exports = router;
