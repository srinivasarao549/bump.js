module( 'Bump.Vector3' );

test( 'Bump.Vector3 exists', 1, function() {
    ok( Bump.Vector3, 'Bump.Vector3 exists' );
} );

test( 'functions exist', 8, function() {
    ok( Bump.Vector3.create, 'create exists' );
    ok( Bump.Vector3.add, 'add exists' );
    ok( Bump.Vector3.subtract, 'subtract exists' );
    ok( Bump.Vector3.multiply, 'multiply exists' );
    ok( Bump.Vector3.divide, 'divide exists' );
    ok( Bump.Vector3.dot, 'dot exists' );
    ok( Bump.Vector3.length2, 'length2 exists' );
    ok( Bump.Vector3.length, 'length exists' );
} );

module( 'Bump.Vector3.create' );

test( 'create produces arrays', 2, function() {
  deepEqual( Bump.Vector3.create(), [ 0, 0, 0, 0 ] );
  deepEqual( Bump.Vector3.create(1, 2, 3), [ 1, 2, 3, 0 ] );
} );

module( 'Bump.Vector3 math functions' );

test( 'add function', 5, function() {
  var v1 = Bump.Vector3.create(1, 2, 3),
  v2 = Bump.Vector3.create(1, -2, 0),
  v3 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.add( v1, v2, v3 );
  equal( ret, v3, 'with destination : return value reflects destination' );
  deepEqual(v1, Bump.Vector3.create( 1, 2, 3 ), 'with destination : original vec unchanged' );
  deepEqual(v3, Bump.Vector3.create( 2, 0, 3 ), 'with destination : correct result');

  ret = Bump.Vector3.add(v1, v2);
  equal( ret, v1, 'in place : return value correct');
  deepEqual(v1, Bump.Vector3.create( 2, 0, 3 ), 'in place : correct result');
} );

test( 'subtract function', 2, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create( 1, -2, 0 ),
  v3 = Bump.Vector3.create();

  Bump.Vector3.subtract( v1, v2, v3 );
  deepEqual( v3, Bump.Vector3.create( 0, 4, 3 ), 'subtract with destination works');

  Bump.Vector3.subtract( v1, v2 );
  deepEqual( v1, Bump.Vector3.create( 0, 4, 3 ), 'subtract in place works');
} );

test( 'multiply function', 2, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create();

  Bump.Vector3.multiply( v1, 2, v2 );
  deepEqual(v2,  Bump.Vector3.create( 2, 4, 6 ), 'multiply with destination works');

  Bump.Vector3.multiply( v1, 2 );
  deepEqual(v1, Bump.Vector3.create( 2, 4, 6 ), 'multiply in place works');
} );

test( 'divide function', 2, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create();

  Bump.Vector3.divide( v1, 2, v2 );
  deepEqual(v2,  Bump.Vector3.create( 0.5, 1, 1.5 ), 'divide with destination works');

  Bump.Vector3.divide( v1, 2 );
  deepEqual(v1, Bump.Vector3.create( 0.5, 1, 1.5 ), 'divide in place works');
} );

test( 'dot function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 1, 1 ),
  v2 = Bump.Vector3.create( 2, 2, 2 );
  equal( Bump.Vector3.dot( v1, v2 ), 6 );
} );

test( 'length2 function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 );
  equal( Bump.Vector3.length2( v1 ), 14 );
} );

test( 'length function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 );
  equal( Bump.Vector3.length( v1 ), Math.sqrt( 14 ) );
} );

test( 'distance2 function', 1, function() {
  var v1 = Bump.Vector3.create( 2, 2, 2 ),
  v2 = Bump.Vector3.create( -1, -1, -1 );
  equal( Bump.Vector3.distance2( v1, v2 ), 27 );
} );

test( 'distance function', 1, function() {
  var v1 = Bump.Vector3.create( 2, 2, 2 ),
  v2 = Bump.Vector3.create( -1, -1, -1 );
  equal( Bump.Vector3.distance( v1, v2 ), Math.sqrt( 27 ) );
} );

test( 'safeNormalize', 3, function() {
  var v1 = Bump.Vector3.create( 2, 0, 0 ),
  v2 = Bump.Vector3.create( 0, 1, -1 ),
  v3 = Bump.Vector3.create();

  deepEqual( Bump.Vector3.safeNormalize( v1 ), Bump.Vector3.create( 1, 0, 0 ) );
  deepEqual( Bump.Vector3.safeNormalize( v2 ), Bump.Vector3.create( 0, 1/Math.sqrt( 2 ), -1/Math.sqrt( 2 ) ) );
  deepEqual( Bump.Vector3.safeNormalize( v3 ), Bump.Vector3.create( 1, 0, 0 ) );
} );

test( 'normalize', 2, function() {
  var v1 = Bump.Vector3.create( 2, 0, 0 ),
  v2 = Bump.Vector3.create( 0, 1, -1 );

  deepEqual( Bump.Vector3.normalize( v1 ), Bump.Vector3.create( 1, 0, 0 ) );
  deepEqual( Bump.Vector3.normalize( v2 ), Bump.Vector3.create( 0, 1/Math.sqrt( 2 ), -1/Math.sqrt( 2 ) ) );
} );

test( 'normalized', 4, function() {
  var v1 = Bump.Vector3.create( 2, 0, 0 ),
  v2 = Bump.Vector3.create( 0, 1, -1 ),
  v3 = Bump.Vector3.create(),
  v4,
  n1 = Bump.Vector3.create( 1, 0, 0 ),
  n2 = Bump.Vector3.create( 0, 1/Math.sqrt( 2 ), -1/Math.sqrt( 2 ) );

  Bump.Vector3.normalized( v1, v3 );
  v4 = Bump.Vector3.normalized( v2, Bump.Vector3.create() );

  deepEqual( v1, Bump.Vector3.create( 2, 0, 0 ) );
  deepEqual( v2, Bump.Vector3.create( 0, 1, -1 ) );
  deepEqual( v3, n1 );
  deepEqual( v4, n2 );
} );

// definitely should add more tests for this one
test( 'rotate', 9, function() {
  var v1 = Bump.Vector3.create( 1, 0, 0 ),
  zAxis = Bump.Vector3.create( 0, 0, 1 ),
  vRot = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.rotate( v1, zAxis, Math.PI/2, vRot );

  equal( ret, vRot );
  deepEqual( v1, Bump.Vector3.create( 1, 0, 0 ) );
  ok( Math.abs( vRot[0] ) < Bump.SIMD_EPSILON, 'vRot[0] is close to 0' );
  ok( Math.abs( vRot[1] - 1 ) < Bump.SIMD_EPSILON, 'vRot[1] is close to 1' );
  ok( Math.abs( vRot[0] ) < Bump.SIMD_EPSILON, 'vRot[2] is close to 0' );

  ret = Bump.Vector3.rotate( v1, zAxis, Math.PI );

  equal( ret, v1 );
  ok( Math.abs( v1[0] + 1 ) < Bump.SIMD_EPSILON, 'v1[0] is close to -1' );
  ok( Math.abs( v1[1] ) < Bump.SIMD_EPSILON, 'v1[1] is close to 0' );
  ok( Math.abs( v1[2] ) < Bump.SIMD_EPSILON, 'v1[2] is close to 0' );
} );

test( 'angle', 7, function() {
  var right = Bump.Vector3.create( 1, 0, 0 ),
  up = Bump.Vector3.create( 0, 1, 0 ),
  left = Bump.Vector3.create( -1, 0, 0 ),
  forward = Bump.Vector3.create( 0, 0, 1 ),
  upRight = Bump.Vector3.create( 1, 1, 0 );

  ok( Math.abs( Bump.Vector3.angle( right, up ) - Math.PI / 2 ) < Bump.SIMD_EPSILON );
  ok( Math.abs( Bump.Vector3.angle( right, forward ) - Math.PI / 2 ) < Bump.SIMD_EPSILON );
  ok( Math.abs( Bump.Vector3.angle( right, left ) - Math.PI ) < Bump.SIMD_EPSILON );
  ok( Math.abs( Bump.Vector3.angle( right, upRight ) - Math.PI / 4 ) < Bump.SIMD_EPSILON );
  ok( Math.abs( Bump.Vector3.angle( left, upRight ) - 3 * Math.PI / 4 ) < Bump.SIMD_EPSILON );
  ok( Math.abs( Bump.Vector3.angle( up, upRight ) - Math.PI / 4 ) < Bump.SIMD_EPSILON );
  ok( Math.abs( Bump.Vector3.angle( forward, upRight ) - Math.PI / 2 ) < Bump.SIMD_EPSILON );
} );

test( 'absolute', 5, function() {
  var v1 = Bump.Vector3.create( -1, -2, 3 ),
  v2 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.absolute( v1, v2 );

  equal( ret, v2 );
  deepEqual( v1, Bump.Vector3.create( -1, -2, 3 ) );
  deepEqual( v2, Bump.Vector3.create( 1, 2, 3 ) );

  ret = Bump.Vector3.absolute( v1 );

  equal( ret, v1 );
  deepEqual( v1, Bump.Vector3.create( 1, 2, 3 ) );
} );