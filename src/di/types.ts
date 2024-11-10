export const TYPES = {
    // Server
    Server: Symbol.for('Server'),
    Express: Symbol.for('Express'),
  
    //Services
    UserService: Symbol.for('UserService'),
    QuestionService: Symbol.for('QuestionService'),
    AnswerService: Symbol.for('AnswerService'),
    SubscriptionService: Symbol.for('SubscriptionService'),
    RedisService: Symbol.for('RedisService'),
    AuthService: Symbol.for('AuthService'),

    // Controllers
    AuthController: Symbol.for('AuthController'),
    UserController: Symbol.for('UserController'),
    QuestionController: Symbol.for('QuestionController'),
    AnswerController: Symbol.for('AnswerController'),
    SubscriptionController: Symbol.for('SubscriptionController'),

    // Middleware
    AuthHandler: Symbol.for('AuthHandler'),
    // SessionHandler: Symbol.for('SessionHandler'),
    // RateLimitHandler: Symbol.for('RateLimitHandler'),
  };