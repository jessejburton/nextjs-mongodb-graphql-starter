/*
*   You can create API routes the same way that
*   you create pages, this file creates the following
*   route /api/user available on the same host and
*   port as the app (default: http://localhost:3000)
*   Full Next.js API route support:
*   https://nextjs.org/docs/api-routes/introduction
*/

/* You can use any JavaScript here to access data
   and return it however you need. */
export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
