# Assignment Canvas

Assignment Canvas (AC) is a webapp ([and android app](https://play.google.com/store/apps/details?id=com.trylaarsdam.assignmentcanvas)) that accesses Instructure's Canvas API and displays data from it in a way that is in my humble opinion a little more intuitive. You can make an account at [https://canvas.toddr.org](https://canvas.toddr.org).

All data retrieved from the Canvas API is requested only when a user requests it, and is never stored on our servers. Only your Canvas API key and URL are stored by AC and are encrypted at rest.

You can see the AC API source code on Github at [trylaarsdam/canvasApiInterface](https://github.com/trylaarsdam/canvasApiInterface), or view the docs if you want to make your own service that interfaces with Canvas easily at [https://canvasapi.toddr.org/docs](https://canvasapi.toddr.org/docs). 

If you need support with your AC account, or have a few questions about the source code for either the web frontend or the API, feel free to either make a Github Issue or contact `support@toddr.org`.
