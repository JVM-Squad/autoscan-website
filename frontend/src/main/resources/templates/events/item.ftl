<#import "../base.ftl" as layout>
<@layout.mainLayout>
    <div class="container space-1">
        <div class="row justify-content-lg-between">
            <div class="w-lg-60 mx-lg-auto">
                <div class="mb-4">
                    <h1 class="h2">${event.title}</h1>
                </div>

                <!-- Author -->
                ${event.body}
            </div>


            <div class="col-lg-3">
                <div class="mb-7">
                    <div class="mb-3">
                        <h3>Newsletter</h3>
                    </div>

                    <!-- Form -->
                    <form class="js-validate mb-2" novalidate="novalidate">
                        <label class="sr-only" for="subscribeSr">Subscribe</label>
                        <div class="input-group input-group-flush mb-3">
                            <input type="email" class="form-control form-control-sm" name="email" id="subscribeSr" placeholder="Your email" aria-label="Your email" required="" data-msg="Please enter a valid email address.">
                        </div>
                        <button type="submit" class="btn btn-sm btn-primary btn-block">Subscribe</button>
                    </form>
                    <!-- End Form -->

                    <p class="small">Get special offers on the latest developments from Front.</p>
                </div>

                <div class="mb-7">
                    <div class="mb-3">
                        <h3>Tags</h3>
                    </div>

                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Business</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Adventure</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Community</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Announcements</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Tutorials</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Resources</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Classic</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Photography</a>
                    <a class="btn btn-xs btn-soft-secondary mb-1" href="#">Interview</a>
                </div>
            </div>
        </div>
    </div>
</@layout.mainLayout>
