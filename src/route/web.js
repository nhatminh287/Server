import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import barberController from "../controllers/barberController";
import customerController from "../controllers/customerController";
import hairstyleController from "../controllers/hairstyleController";
import barbershopController from "../controllers/barbershopController";
import handbookController from "../controllers/handbookController";

let router = express.Router();

let initWebRoutes = (app) => {
  // Link for test
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  /**
   * @openapi
   * '/api/login':
   *  post:
   *     tags:
   *     - User
   *     summary: User login
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Logged in
   *       400:
   *         description: Bad Request
   */
  router.post("/api/login", userController.handleLogin);

  /**
   * @openapi
   * '/api/get-all-users':
   *  get:
   *     tags:
   *     - User
   *     summary: Get all users
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  router.get("/api/get-all-users", userController.handleGetAllUsers);

  /**
   * @openapi
   * '/api/create-new-user':
   *  post:
   *     tags:
   *     - User
   *     summary: Create new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       201:
   *         description: Created
   *       400:
   *         description: Bad Request
   *       409:
   *         description: Conflict
   */
  router.post("/api/create-new-user", userController.handleCreateNewUser);

  /**
   * @openapi
   * '/api/edit-user':
   *  put:
   *     tags:
   *     - User
   *     summary: Edit user details
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Updated
   *       400:
   *         description: Bad Request
   */
  router.put("/api/edit-user", userController.handleEditUser);

  /**
   * @openapi
   * '/api/delete-user':
   *  delete:
   *     tags:
   *     - User
   *     summary: Delete a user by ID
   *     parameters:
   *       - name: id
   *         in: query
   *         required: true
   *         description: ID of the user to delete
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Deleted
   *       404:
   *         description: Not Found
   */
  router.delete("/api/delete-user", userController.handleDeleteUser);

  /**
   * @openapi
   * '/api/allcode':
   *  get:
   *     tags:
   *     - User
   *     summary: Get all codes
   *     responses:
   *       200:
   *         description: Success
   */
  router.get("/api/allcode", userController.getAllCode);

  /**
   * @openapi
   * '/api/top-barber-home':
   *  get:
   *     tags:
   *     - Barber
   *     summary: Get top barbers for homepage
   *     responses:
   *       200:
   *         description: Success
   */
  router.get("/api/top-barber-home", barberController.getTopBarberHome);

  /**
   * @openapi
   * '/api/get-all-barbers':
   *  get:
   *     tags:
   *     - Barber
   *     summary: Get all barbers
   *     responses:
   *       200:
   *         description: Success
   */
  router.get("/api/get-all-barbers", barberController.getAllBarbers);

  /**
   * @openapi
   * '/api/save-infor-barbers':
   *  post:
   *     tags:
   *     - Barber
   *     summary: Save barber information
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               specialties:
   *                 type: string
   *     responses:
   *       200:
   *         description: Info Saved
   *       400:
   *         description: Bad Request
   */
  router.post("/api/save-infor-barbers", barberController.postInforBarber);

  /**
   * @openapi
   * '/api/send-remedy':
   *  post:
   *     tags:
   *     - Barber
   *     summary: Send remedy to customer
   *     responses:
   *       200:
   *         description: Success
   */
  router.post("/api/send-remedy", barberController.sendRemedy);

  /**
   * @openapi
   * '/api/get-detail-barber-by-id':
   *  get:
   *     tags:
   *     - Barber
   *     summary: Get barber details by ID
   *     parameters:
   *       - name: id
   *         in: query
   *         required: true
   *         description: Barber ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not Found
   */
  router.get(
    "/api/get-detail-barber-by-id",
    barberController.getDetailBarberById
  );

  /**
   * @openapi
   * '/api/bulk-create-schedule':
   *  post:
   *     tags:
   *     - Schedule
   *     summary: Bulk create barber schedules
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               schedules:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     date:
   *                       type: string
   *                     time:
   *                       type: string
   *     responses:
   *       201:
   *         description: Created
   *       400:
   *         description: Bad Request
   */
  router.post("/api/bulk-create-schedule", barberController.bulkCreateSchedule);

  /**
   * @openapi
   * '/api/get-schedule-barber-by-date':
   *  get:
   *     tags:
   *     - Schedule
   *     summary: Get barber schedule by date
   *     parameters:
   *       - name: barberId
   *         in: query
   *         required: true
   *         description: Barber ID
   *         schema:
   *           type: number
   *       - name: date
   *         in: query
   *         required: true
   *         description: Date
   *         schema:
   *           type: string
   *           format: date
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not Found
   */
  router.get(
    "/api/get-schedule-barber-by-date",
    barberController.getScheduleByDate
  );

  /**
   * @openapi
   * '/api/get-extra-infor-barber-by-id':
   *  get:
   *     tags:
   *     - Barber
   *     summary: Get extra information of a barber by ID
   *     parameters:
   *       - name: id
   *         in: query
   *         required: true
   *         description: Barber ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not Found
   */
  router.get(
    "/api/get-extra-infor-barber-by-id",
    barberController.getExtraInforBarberById
  );

  /**
   * @openapi
   * '/api/get-profile-barber-by-id':
   *  get:
   *     tags:
   *     - Barber
   *     summary: Get barber profile by ID
   *     parameters:
   *       - name: id
   *         in: query
   *         required: true
   *         description: Barber ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not Found
   */
  router.get(
    "/api/get-profile-barber-by-id",
    barberController.getProfileBarberById
  );

  /**
   * @openapi
   * '/api/get-list-customer-for-barber':
   *  get:
   *     tags:
   *     - Barber
   *     summary: Get list of customers for a barber
   *     parameters:
   *       - name: barberId
   *         in: query
   *         required: true
   *         description: Barber ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not Found
   */
  router.get(
    "/api/get-list-customer-for-barber",
    barberController.getListCustomerForBarber
  );

  /**
   * @openapi
   * '/api/customer-book-appointment':
   *  post:
   *     tags:
   *     - Appointment
   *     summary: Book an appointment for a customer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               barberId:
   *                 type: number
   *               customerId:
   *                 type: number
   *               date:
   *                 type: string
   *               time:
   *                 type: string
   *     responses:
   *       201:
   *         description: Appointment booked
   *       400:
   *         description: Bad Request
   */
  router.post(
    "/api/customer-book-appointment",
    customerController.postBookAppointment
  );

  /**
   * @openapi
   * '/api/verify-book-appointment':
   *  post:
   *     tags:
   *     - Appointment
   *     summary: Verify a booked appointment
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               appointmentId:
   *                 type: number
   *     responses:
   *       200:
   *         description: Verified
   *       400:
   *         description: Bad Request
   */
  router.post(
    "/api/verify-book-appointment",
    customerController.postVerifyBookAppointment
  );

  /**
   * @openapi
   * '/api/create-new-hairstyle':
   *  post:
   *     tags:
   *     - Hairstyle
   *     summary: Create a new hairstyle
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Created
   *       400:
   *         description: Bad Request
   */
  router.post("/api/create-new-hairstyle", hairstyleController.createHairstyle);

  /**
   * @openapi
   * '/api/get-all-hairstyle':
   *  get:
   *     tags:
   *     - Hairstyle
   *     summary: Get all hairstyles
   *     responses:
   *       200:
   *         description: Success
   */
  router.get("/api/get-all-hairstyle", hairstyleController.getAllHairstyle);

  /**
   * @openapi
   * '/api/get-detail-hairstyle-by-id':
   *  get:
   *     tags:
   *     - Hairstyle
   *     summary: Get hairstyle details by ID
   *     parameters:
   *       - name: id
   *         in: query
   *         required: true
   *         description: Hairstyle ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not Found
   */
  router.get(
    "/api/get-detail-hairstyle-by-id",
    hairstyleController.getDetailHairstyleById
  );

  /**
   * @openapi
   * '/api/create-new-barbershop':
   *  post:
   *     tags:
   *     - Barbershop
   *     summary: Create a new barbershop
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               address:
   *                 type: string
   *     responses:
   *       201:
   *         description: Created
   *       400:
   *         description: Bad Request
   */
  router.post(
    "/api/create-new-barbershop",
    barbershopController.createBarbershop
  );

  /**
   * @openapi
   * '/api/get-barbershop':
   *  get:
   *     tags:
   *     - Barbershop
   *     summary: Get all barbershops
   *     responses:
   *       200:
   *         description: Success
   */
  router.get("/api/get-barbershop", barbershopController.getAllBarbershop);

  /**
   * @openapi
   * '/api/get-detail-barbershop-by-id':
   *  get:
   *     tags:
   *     - Barbershop
   *     summary: Get barbershop details by ID
   *     parameters:
   *       - name: id
   *         in: query
   *         required: true
   *         description: Barbershop ID
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not Found
   */
  router.get(
    "/api/get-detail-barbershop-by-id",
    barbershopController.getDetailBarbershopById
  );

  /**
   * @openapi
   * '/api/get-handbook':
   *  get:
   *     tags:
   *     - Handbook
   *     summary: Get all handbooks
   *     responses:
   *       200:
   *         description: Success
   */
  router.get("/api/get-handbook", handbookController.getAllHandbook);

  /**
   * @openapi
   * '/api/edit-hairstyle':
   *  put:
   *     tags:
   *     - Hairstyle
   *     summary: Edit hairstyle details
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: number
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Updated
   *       400:
   *         description: Bad Request
   */
  router.put("/api/edit-hairstyle", hairstyleController.editHairstyle);

  return app.use("/", router);
};

module.exports = initWebRoutes;
