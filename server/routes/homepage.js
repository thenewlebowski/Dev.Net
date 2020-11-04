var express = require('express');
var router = express.Router();

//=====Recent Post Route=====//
router.get('/recentpost', (req, res, next)=>{
    res.json(
        {
            header: 'Hello World',
            body : 'Software development careers are estimated to grow 50 percent by the year 2025. Our goal is to educate future developers of up and coming technologies. In our efforts we hope to establish an ecosystem of thriving developers that continue to grow and keep our ideologies strong by educating their own peers. If you are interested in joining the Dev Army click the link below.',
            img: 'some url',
            href: '/someurl',
            btnText: 'Check out post'
        }
    )
})

module.exports = router;